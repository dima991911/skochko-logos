const mongoose = require('mongoose');

const { Schema } = mongoose;

const PresentationListSchema = new Schema({
    projects: [{ type: Schema.Types.ObjectId, ref: "Presentations" }],
});

mongoose.model('PresentationList', PresentationListSchema);
