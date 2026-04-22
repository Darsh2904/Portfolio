const express = require('express');
const router = express.Router();
const { getProjects, getProject } = require('../controllers/projectController');

// GET /api/projects
router.get('/', getProjects);

// GET /api/projects/:slug
router.get('/:slug', getProject);

module.exports = router;
