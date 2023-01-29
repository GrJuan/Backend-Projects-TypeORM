import { getMongoManager, getRepository } from "typeorm";
import { Request, Response } from "express";
import { validate } from "class-validator";

//ENTITY
import { Project } from "../entity/projects/Project";
import { User } from "../entity/user/User";

require('dotenv').config();

export class ProjectController {

    static getAllProjects = async (req: Request, res: Response) => {

        const userRepository = getRepository(Project);

        let users;
        try {
            users = await userRepository.find({ relations: ["user"]});
        }
        catch (e) {
            res.status(400).json({ message: 'Not Result.' });
        }

        if (users.length > 0) {
            res.send(users);
        } else {
            res.status(400).json({ message: 'Not Result.' });
        }
    };
    static createProject = async (req: Request, res: Response) => {
        const { nameProject, aboutProject } = req.body;
        const project = new Project()

        project.nameProject = nameProject;
        project.aboutProject = aboutProject;

        const validationOpt = { validationError: { target: false, value: false } };

        const errors = await validate(project, validationOpt);

        if (errors.length > 0) {
            return res.status(401).json({ message: errors });
        }

        const projectRepository = getRepository(Project)

        try {
            await projectRepository.save(project);
            res.status(201).json({ message: "Project Created" })
        }catch (e) {
            return res.status(401).json({ message: "An error occurred with validation!" })
        }

    }
}
export default ProjectController;