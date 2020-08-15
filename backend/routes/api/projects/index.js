const express = require('express');
const multer = require('multer');
const upload = multer();
const isAuthMiddleware = require('../../../middleware/auth.middleware');

const router = express.Router();

const presentationController = require('../../../controllers/presentation.controller');

router.post('/', isAuthMiddleware,
    upload.fields([{ name: 'topSectionImg', maxCount: 1 }, { name: 'bottomSectionImg', maxCount: 1 }, { name: 'preview', maxCount: 1 }, { name: 'images', maxCount: 10 }]),
    presentationController.createPresentation);

router.get('/', presentationController.getProjects);
router.get('/:slug', presentationController.getProject);
router.delete('/:id', isAuthMiddleware, presentationController.removeProject);
router.put('/order/:id', isAuthMiddleware, presentationController.changeOrder);
router.put('/preview/:id', isAuthMiddleware, upload.fields([{ name: 'preview' }]), presentationController.changePreview);

module.exports = router;