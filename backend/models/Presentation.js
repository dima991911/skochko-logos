const mongoose = require('mongoose');

const { Schema } = mongoose;

const PresentationsSchema = new Schema({
    backgroundColor: {
        type: String,
        required: true,
    },
    textColor: {
        type: String,
        required: true,
    },
    preview: {
        type: String,
        required: true,
    },
    topSectionImg: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    slogan: {
        type: String,
    },
    description: {
        type: String,
    },
    websiteLink: {
        type: String,
    },
    feedback: {
        type: String,
    },
    clientName: {
        type: String,
    },
    bottomSectionImg: {
        type: String,
    },
    images: [{ type: Schema.Types.ObjectId, ref: "Images" }],
});

mongoose.model('Presentations', PresentationsSchema);
