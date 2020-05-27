const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProjectSamplesSchema = new Schema({
    sampleSrc: {
        type: String,
        required: true,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Projects"
    }
});

mongoose.model('ProjectSamples', ProjectSamplesSchema);
