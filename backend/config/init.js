const mongoose = require('mongoose');

const PresentationList = mongoose.model('PresentationList');

module.exports = async () => {
    const presentationList = await PresentationList.find({});
    if (presentationList.length === 0) {
        await PresentationList.create({ projects: [] });
    }
};
