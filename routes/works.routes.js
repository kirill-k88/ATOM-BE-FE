const express = require('express');
const worksController = require('../controllers/works.controller');

const worksRouter = express.Router();

worksRouter.post('/', worksController.uploadWorks);
worksRouter.get('/', worksController.getAllWorks);

module.exports = worksRouter;
