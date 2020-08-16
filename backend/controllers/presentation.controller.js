const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');
const fs = require('fs');

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

module.exports.createPresentation = async(req, res) => {
    const body = req.body;
    const files = req.files;
    const slug = slugify(body.name, { lower: true, replacement: '-' });
    const projectsList = await PresentationList.findOne({}).populate('projects');

    const topSectionImg = saveImg(files.topSectionImg[0]);
    const preview = saveImg(files.preview[0]);
    let newProject = new Presentation({ ...defaultPresentation, ...body, topSectionImg, preview, slug });

    if (files.bottomSectionImg) {
        const bottomSectionImg = saveImg(files.bottomSectionImg[0]);
        newProject.bottomSectionImg = bottomSectionImg;
    }

    if (files.images) {
        const imgPromises = [];

        files.images.forEach(img => {
            imgPromises.push(new Promise((resolve, reject) => {
                const url = saveImg(img);
                Image.create({ url }, (err, createdImg) => {
                    if (err) res.status(500).send({ error: 'Something went wrong' });
                    else {
                        resolve(createdImg._id);
                    }
                });
            }));
        });

        newProject.images = await Promise.all(imgPromises);
        await projectsList.save();
    }

    await newProject.save();
    projectsList.projects.push(newProject._id);
    await projectsList.save();
    newProject = await newProject.populate('images').execPopulate();
    res.status(200).json({ project: newProject });
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

    const urlForDelete = [project.preview, project.topSectionImg, project.bottomSectionImg, ...project.images.map(i => i.url)];
    removeImages(urlForDelete);

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
    removeImages([project.preview]);

    project.preview = saveImg(preview);
    await project.save();

    res.status(200).json({ project });
};

module.exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const files = req.files;
    const project = await Presentation.findById(id).populate('images');

    if (files.topSectionImg) {
        removeImages([project.topSectionImg]);
        project.topSectionImg = saveImg(files.topSectionImg[0]);
    }

    if (files.bottomSectionImg) {
        removeImages([project.bottomSectionImg]);
        project.bottomSectionImg = saveImg(files.bottomSectionImg[0]);
    }

    if (body.deleteImages) {
        const deleteImagesIds = body.deleteImages.split(',');
        const findImagesForDelete = await Image.find({ _id: { $in: deleteImagesIds } });
        removeImages(findImagesForDelete.map(i => i.url));
        await Image.deleteMany({ _id: { $in: deleteImagesIds } });
    }

    if (files.images) {
        const imagePromises = [];
        files.images.forEach(i => {
            imagePromises.push(new Promise((resolve, reject) => {
                Image.create({ url: saveImg(i) }, (err, newImage) => {
                    if (err) reject();
                    else resolve(newImage._id);
                });
            }))
        })

        Promise.all(imagePromises)
            .then(async imgIds => {
                project.images.push(...imgIds);
                delete body['deleteImages'];

                for (let key in body) {
                    project[key] = body[key];
                }

                await project.save();
                res.status(200).json({ project });
            })
            .catch(() => {
                res.status(500).send({ error: 'Something went wrong' });
            });
    } else {
        delete body['deleteImages'];

        for (let key in body) {
            project[key] = body[key];
        }

        await project.save();
        res.status(200).json({ project });
    }
};

const removeImages = (imagesUrlArr) => {
    imagesUrlArr.forEach(url => {
        const path = 'public/' + url;
        if (fs.existsSync(path)) {
            fs.unlinkSync(path);
        }
    });
};

const saveImg = (imgFile) => {
    const name =  uuidv4() + '.jpg';

    fs.writeFileSync('public/' + name, imgFile.buffer);
    return name;
};
