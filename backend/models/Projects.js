const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProjectsSchema = new Schema({
    logoSrc: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    webSite: {
        type: String,
        required: false,
    },
    logoCreatedAt: {
        type: Number,
        required: true,
    },
    rightTopSectionBg: {
        type: String,
        required: true,
    },
    rightTopSectionFontColor: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false
    },
    projectSamples: [{
        type: Schema.Types.ObjectId,
        ref: "ProjectSamples"
    }]
});

mongoose.model('Projects', ProjectsSchema);
