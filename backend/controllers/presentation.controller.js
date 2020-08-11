const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const Image = mongoose.model('Images');
const Presentation = mongoose.model('Presentations');

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

    const topSectionImg = saveImg(files.topSectionImg[0]);
    const preview = saveImg(files.preview[0]);
    let newProject = new Presentation({ ...defaultPresentation, ...body, topSectionImg, preview });

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

        Promise.all(imgPromises).then(async result => {
            newProject.images = result;
            await newProject.save();
            newProject = await newProject.populate('images').execPopulate();

            res.status(200).json({ project: newProject });
        });
    } else {
        await newProject.save();
        res.status(200).json({ project: newProject });
    }
};

module.exports.getProjects = async(req, res) => {
    const projects = await Presentation.find({}).populate('images');
    res.status(200).json({ projects });
};

module.exports.getProject = async(req, res) => {
    const { id } = req.params;
    const project = await Presentation.findById(id).populate('images');
    res.status(200).json({ project });
};

module.exports.removeProject = async(req, res) => {
    const { id } = req.params;
    const project = await Presentation.findById(id).populate('images');

    const urlForDelete = [project.preview, project.topSectionImg, project.bottomSectionImg, ...project.images.map(i => i.url)];
    urlForDelete.forEach(url => {
        if (url) {
            fs.unlinkSync('public/' + url);
        }
    });

    await Image.deleteMany({ _id: { $in: [...project.images.map(i => i._id)] } });
    project.remove((err) => {
        if (err) res.status(500).send({ error: 'Something went wrong' });
        else res.status(200).send({ id });
    });
};

const saveImg = (imgFile) => {
    const name =  uuidv4() + '.jpg';

    fs.writeFileSync('public/' + name, imgFile.buffer);
    return name;
};