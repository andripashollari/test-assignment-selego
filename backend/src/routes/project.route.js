import express from 'express';
import { createProject, getProjects, deleteProject } from '../controllers/project.controller.js';

const router = express.Router();

router.get('/', getProjects);
router.post('/', createProject);
router.delete('/:id', deleteProject);
router.post('/:id', updateProject);

export default router;