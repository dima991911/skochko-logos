const express = require('express');
const multer = require('multer');
const upload = multer();

const router = express.Router();

const presentationController = require('../../../controllers/presentation.controller');

router.post('/',
    upload.fields([{ name: 'topSectionImg', maxCount: 1 }, { name: 'bottomSectionImg', maxCount: 1 }, { name: 'preview', maxCount: 1 }, { name: 'images', maxCount: 10 }]),
    presentationController.createPresentation);

module.exports = router;