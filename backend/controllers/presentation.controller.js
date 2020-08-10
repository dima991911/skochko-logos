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

const saveImg = (imgFile) => {
    const name =  uuidv4() + '.jpg';

    fs.writeFileSync('public/' + name, imgFile.buffer);
    return name;
};