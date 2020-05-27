const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Users = mongoose.model('Users');
const Projects = mongoose.model('Projects');
const ProjectSamples = mongoose.model('ProjectSamples');

async function createSamples(projectId) {
    const samples = [];
    for (let i = 1; i < 4; i++) {
        const sample = await ProjectSamples.create({
            sampleSrc: 'src',
            project: projectId,
        });
        samples.push(sample);
    }

    return samples;
}

/* GET home page. */
router.get('/', async function(req, res, next) {
    const createdProject = await Projects.create({
        logoSrc: 'Some',
        name: 'Name',
        description: 'Some description for this',
        logoCreatedAt: 2015,
        rightTopSectionBg: 'black',
        rightTopSectionFontColor: 'white',
    });
    const samples = await createSamples(createdProject._id);
    createdProject.projectSamples = samples.map(sample => sample._id);
    await createdProject.save();

    res.render('index', { title: 'Express' });
});

router.get('/projects', async function(req, res, next) {
    const projects = await Projects.find({}).populate({
        path: 'projectSamples',
        model: 'ProjectSamples',
        populate: {
            path: 'project',
            model: 'Projects',
        }
    }).exec((err, projects) => {
        if (err) res.send(400, err);

        res.status(200).json(projects);
    });
});

module.exports = router;
