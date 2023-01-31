import { Router } from "express";
import ProjectController from '../controller/ProjectController';

const router = Router();

router.post('/', ProjectController.createProject);

router.get('/', ProjectController.getAllProjects);

router.get('/:id', ProjectController.getProjectById);

router.put('/edite/:id', ProjectController.editeProject);

router.delete('/delete/:id', ProjectController.deleteProject);

export default router;