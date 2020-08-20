const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');
const awsSdk = require('aws-sdk');
const handleError = require('errorhandler');

const config = require('../config/index');

const bucket = config.bucket;

const Image = mongoose.model('Images');
const Presentation = mongoose.model('Presentations');
const PresentationList = mongoose.model('PresentationList');

const defaultPresentation = {
    backgroundColor: '#000',
    textColor: '#fff',
    preview: null,
    topSectionImg: null,
    name: null,
    slogan: null,
    description: null,
    websiteLink: null,
    images: [],
    feedback: null,
    clientName: null,
    bottomSectionImg: null,
};

const s3bucket = new awsSdk.S3({
    accessKeyId: bucket.USER_KEY,
    secretAccessKey: bucket.USER_SECRET,
    Bucket: bucket.BUCKET_NAME
});

module.exports.createPresentation = async(req, res) => {
    const body = req.body;
    const files = req.files;
    const slug = slugify(body.name, { lower: true, replacement: '-' });
    const projectsList = await PresentationList.findOne({}).populate('projects');

    let newProject = new Presentation({ ...defaultPresentation, ...body, slug });

    try {
        const topSectionImg = await saveFileInS3(files.topSectionImg[0]);
        newProject.topSectionImg = topSectionImg.Location;
    } catch (err) {
        res.status(500).send({ error: err });
        handleError(err);
    }

    try {
        const preview = await saveFileInS3(files.preview[0]);
        newProject.preview = preview.Location;
    } catch (err) {
        handleError(err);
    }

    if (files.bottomSectionImg) {
        try {
            const bottomSectionImg = await saveFileInS3(files.bottomSectionImg[0]);
            newProject.bottomSectionImg = bottomSectionImg.Location;
        } catch (err) {
            handleError(err);
        }
    }

    const imagesPromises = [];
    if (files.images) {
        files.images.forEach(img => {
            imagesPromises.push(saveFileInS3(img));
        });
    }

    if (imagesPromises.length > 0) {
        const createdImages = await Promise.all(imagesPromises);
        Image.insertMany(createdImages.map(i => {
            return { url: i.Location };
        }), async (err, images) => {
            if (err) handleError(err);
            else {
                newProject.images = images.map(i => i._id);
                await newProject.save();

                projectsList.projects.push(newProject._id);
                await projectsList.save();
                newProject = await newProject.populate('images').execPopulate();
                res.status(200).json({ project: newProject });
            }
        });
    } else {
        await newProject.save();
        projectsList.projects.push(newProject._id);
        await projectsList.save();
        res.status(200).json({ project: newProject });
    }
};

module.exports.getProjects = async(req, res) => {
    const projectList = await PresentationList.findOne({}).populate({ path: 'projects', populate: { path: 'images' } });
    res.status(200).json({ projects: projectList.projects});
};

module.exports.getProject = async(req, res) => {
    const { slug } = req.params;
    const project = await Presentation.findOne({ slug }).populate('images');
    res.status(200).json({ project });
};

module.exports.removeProject = async(req, res) => {
    const { id } = req.params;
    const project = await Presentation.findById(id).populate('images');
    const projectList = await PresentationList.findOne({});

    const keyForDelete = [
        getKeyFromUrl(project.preview),
        getKeyFromUrl(project.topSectionImg),
        ...project.images.map(i => getKeyFromUrl(i.url)),
    ];

    if (project.bottomSectionImg) keyForDelete.push(getKeyFromUrl(project.bottomSectionImg));


    try {
        const deleteImagesPromises = [];
        keyForDelete.forEach(k => deleteImagesPromises.push(deleteFromS3(k)));
        await Promise.all(deleteImagesPromises);

    } catch (err) {
        res.status(500).send({ error: err });
    }

    await Image.deleteMany({ _id: { $in: [...project.images.map(i => i._id)] } });
    project.remove(async err => {
        if (err) {
            res.status(500).send({ error: 'Something went wrong' });
        } else {
            const indexForDelete = projectList.projects.findIndex(p => p._id.toString() === id);
            projectList.projects.splice(indexForDelete, 1);
            await projectList.save();

            res.status(200).send({ id });
        }
    });
};

module.exports.changeOrder = async(req, res) => {
    const { id } = req.params;
    const { isToTop } = req.body;
    const projectsList = await PresentationList.findOne({});
    const { projects } = projectsList;

    for (let i = 0; i < projects.length; i++) {
        if (projects[i]._id.toString() === id) {
            const indexToDirection = isToTop ? i - 1 : i + 1;
            const tmpProject = projects[indexToDirection];
            projects[indexToDirection] = projects[i];
            projects[i] = tmpProject;
            break;
        }
    }

    projectsList.projects = projects;
    await PresentationList.update({ _id: projectsList._id }, { $set: { projects: projects } });
    res.status(200).send({ status: 200 });
};

module.exports.changePreview = async (req, res) => {
    const { id } = req.params;
    const preview = req.files.preview[0];
    const project = await Presentation.findById(id).populate('images');

    try {
        const key = getKeyFromUrl(project.preview);
        await deleteFromS3(key);

        const newPreview = await saveFileInS3(preview);
        project.preview = newPreview.Location;
        await project.save();
        res.status(200).json({ project });
    } catch (err) {
        res.status(500).send({ error: err });
        handleError(err);
    }
};

module.exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const files = req.files;
    const project = await Presentation.findById(id).populate('images');

    if (files.topSectionImg) {
        await deleteFromS3(getKeyFromUrl(project.topSectionImg));
        const newTopSection = await saveFileInS3(files.topSectionImg[0]);
        project.topSectionImg = newTopSection.Location;
    }

    if (files.bottomSectionImg) {
        if (project.bottomSectionImg) {
            await deleteFromS3(getKeyFromUrl(project.bottomSectionImg));
        }
        const newBottomSection = await saveFileInS3(files.bottomSectionImg[0]);
        project.bottomSectionImg = newBottomSection.Location;
    }

    if (body.deleteImages) {
        const deleteImagesIds = body.deleteImages.split(',');
        const findImagesForDelete = await Image.find({ _id: { $in: deleteImagesIds } });

        try {
            const imagesForDeletePromises = [];
            findImagesForDelete.forEach(i => imagesForDeletePromises.push(deleteFromS3(getKeyFromUrl(i.url))));

            await Promise.all(imagesForDeletePromises);
            await Image.deleteMany({ _id: { $in: deleteImagesIds } });
        } catch (err) {
            res.status(500).send({ error: err });
        }
    }

    if (files.images) {
        const imagePromises = [];
        files.images.forEach(i => {
            imagePromises.push(saveFileInS3(i));
        })

        try {
            const newImages = await Promise.all(imagePromises);
            const createdImages = await Image.insertMany(newImages.map(i => {
                return { url: i.Location };
            }));

            project.images.push(...createdImages.map(i => i._id));
            delete body['deleteImages'];

            for (let key in body) {
                project[key] = body[key];
            }

            await project.save();
            res.status(200).json({ project });

        } catch (err) {
            res.status(200).send({ error: err });
        }

    } else {
        delete body['deleteImages'];

        for (let key in body) {
            project[key] = body[key];
        }

        await project.save();
        res.status(200).json({ project });
    }
};

const getKeyFromUrl = (url) => {
    return url.substr(url.lastIndexOf('/') + 1);
};

const saveFileInS3 = async (file) => {
    return new Promise(((resolve, reject) => {
        s3bucket.createBucket(function () {
            const params = {
                Bucket: bucket.BUCKET_NAME,
                Key: uuidv4(),
                ContentType: file.mimetype,
                Body: file.buffer,
                ACL: 'public-read',
            };

            s3bucket.upload(params, function (err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }))
};

const deleteFromS3 = async (key) => {
    return new Promise((resolve, reject) => {
        s3bucket.deleteObject({
            Bucket: bucket.BUCKET_NAME,
            Key: key,
        }, function(err, data) {
            if (err) reject(err);
            else {
                resolve(data);
            }
        });
    })
}
