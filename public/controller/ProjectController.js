"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
//ENTITY
const Project_1 = require("../entity/projects/Project");
require('dotenv').config();
class ProjectController {
}
exports.ProjectController = ProjectController;
_a = ProjectController;
ProjectController.getAllProjects = async (req, res) => {
    const userRepository = (0, typeorm_1.getRepository)(Project_1.Project);
    let users;
    try {
        users = await userRepository.find({ relations: ["user"] });
    }
    catch (e) {
        res.status(400).json({ message: 'Not Result.' });
    }
    if (users.length > 0) {
        res.send(users);
    }
    else {
        res.status(400).json({ message: 'Not Result.' });
    }
};
ProjectController.createProject = async (req, res) => {
    const { nameProject, aboutProject } = req.body;
    const project = new Project_1.Project();
    project.nameProject = nameProject;
    project.aboutProject = aboutProject;
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await (0, class_validator_1.validate)(project, validationOpt);
    if (errors.length > 0) {
        return res.status(401).json({ message: errors });
    }
    const projectRepository = (0, typeorm_1.getRepository)(Project_1.Project);
    try {
        await projectRepository.save(project);
        res.status(201).json({ message: "Project Created" });
    }
    catch (e) {
        return res.status(401).json({ message: "An error occurred with validation!" });
    }
};
exports.default = ProjectController;
//# sourceMappingURL=ProjectController.js.map