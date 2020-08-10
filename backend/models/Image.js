const mongoose = require('mongoose');

const { Schema } = mongoose;

const ImagesSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
});

mongoose.model('Images', ImagesSchema);
