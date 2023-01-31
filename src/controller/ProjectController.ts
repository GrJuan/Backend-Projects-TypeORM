import { Request, Response } from "express";
import { validate } from "class-validator";
import { repositorys } from '../util/repository';
import { Project } from "../entity/projects/Project";
import { getRepository } from 'typeorm';

require('dotenv').config();


export class ProjectController {


    static getAllProjects = async (req: Request, res: Response) => {

        let projects;

        try {
            projects = await getRepository(Project).find({ relations: ["user"]});
        }
        catch (e) {
            res.status(400).json({ message: 'Not Result.' });
        }

        if (projects.length > 0) {
            res.send(projects);
        } else {
            res.status(400).json({ message: 'Not Result.' });
        }
    };

    static getProjectById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const projectRepository = getRepository(Project);
        try {
            const user = await projectRepository.findOneOrFail(id);
            res.send(user);
        } catch (e) {
            res.status(400).json({ message: 'Without result' });
        }
    };

    static createProject = async (req: Request, res: Response) => {
        const { nameProject, aboutProject } = req.body;

        const project = new Project();

        project.nameProject = nameProject;
        project.aboutProject = aboutProject;

        const validationOpt = { validationError: { target: false, value: false } };

        const errors = await validate(project, validationOpt);

        if (errors.length > 0) {
            return res.status(401).json({ message: errors });
        }

        const projectRepository = getRepository(Project);

        try {
            await projectRepository.save(project);
            res.status(201).json({ message: "Project Created" })
        }catch (e) {
            return res.status(401).json({ message: "An error occurred with validation!" })
        }

    }

    
    static deleteProject = async (req: Request, res: Response) => {
        const { id } = req.params;
        const projectRepository = getRepository(Project);

        let project: Project;

        try {
            project = await projectRepository.findOneOrFail(id);
        } catch (e) {
            return res.status(400).json({ message: 'Project not found' });
        }
        projectRepository.delete(id);

        res.status(201).json({ message: 'Removed Project' });
    };

    static editeProject = async (req: Request, res: Response) => {
        let project;

        const { id } = req.params;
        const { nameProject, aboutProject } = req.body;

        const projectRepository = getRepository(Project);

        try {
            project = await projectRepository.findOneOrFail(id);
        } catch (e) {
            return res.status(400).json({ message: 'Project not found' });
        }
    
        project.nameProject = nameProject;
        project.aboutProject = aboutProject;


        const validationOpt = { validateError: { target: false, value: false } };
        const errors = await validate(project, validationOpt);
        if (errors.length > 0) {
            return res.status(401).json({ message: errors });
        }
        await projectRepository.save(project);

        res.status(201).json({ message: 'project Update' })

    };
}
export default ProjectController;