import { Request, Response } from "express";
import { validate } from "class-validator";
import * as jwt from "jsonwebtoken";
import { repositorys } from '../util/repository';
import { User } from "../entity/user/User";
import { getRepository } from 'typeorm';

require('dotenv').config();

export class UserController {

    static getAllUsers = async (req: Request, res: Response) => {

        const userRepository = getRepository(User);

        let users;

        try {
            users = await userRepository.find({ relations: ["project"]});

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

    static newUser = async (req: Request, res: Response) => {
        const { password, email, firstName, lastName, role, dateTime, gender, country, photo  } = req.body;
        const user = new User()
        let token = '';


        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = password;
        user.status = true;
        user.activationCode = '';
        user.resetToken = '';
        user.country = country;
        user.gender = gender;
        user.role  = role;
        user.photo = photo;
        user.activityDate = dateTime;

 
        //VALIDAR
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(user, validationOpt);
        if (errors.length > 0) {
            return res.status(401).json({ message: errors });
        };
        const userRepository = getRepository(User);


        //validate Duplicate Username And Email
        try {
            const existUser = await userRepository.findOneOrFail({ where: { email } });
            if (existUser) {
                return res.status(400).json({ message: "Email is already in use." });
            }
        } catch (e) {

        }
        let code = (Math.random() + 1).toString(36).substring(7);


        user.hashPassword();
            token = jwt.sign({ userId: user.id, email: user.email, code: code }, 'jams32ubaud2AS@', { expiresIn: '1h' });
            user.activationCode = code;
            await userRepository.save(user);

        try {
            res.status(201).json({ message: "User Created" })
        } catch (error) {
            res.status(400).json({ message: "An error occurred with validation!" })
        }

    };

    static getUserById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userRepository = getRepository(User);
        try {
            const user = await userRepository.findOneOrFail(id, { relations: ["project"] });
            res.send(user);
        } catch (e) {
            res.status(400).json({ message: 'Without result' });
        }
    };

    static editeUser = async (req: Request, res: Response) => {
        let user;
        const { id } = req.params;
        const { email, firstName, lastName, gender, country, phone, whatsapp, linkedin, github, about  } = req.body;

        const userRepository = getRepository(User);
        try {
            user = await userRepository.findOneOrFail(id)
        } catch (e) {
            return res.status(400).json({ message: 'User not found!' })
        }

        user.username = firstName;
        user.lastName = lastName;
        user.phone = phone;
        user.country = country;
        user.gender = gender;
        user.email = email;
        user.whatsapp = whatsapp;
        user.linkedin = linkedin;
        user.github = github;
        user.about = about;


        const validationOpt = { validateError: { target: false, value: false } };
        const errors = await validate(user, validationOpt);
        if (errors.length > 0) {
            return res.status(401).json({ message: errors });
        };

        //GUARDAR EL USUARIO
        try {
            await userRepository.save(user);
        } catch (e) {
            return res.status(400).json({ message: 'Username already exists' })
        }
        res.status(201).json({ message: 'Updated User' })

    };

    static deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userRepository = getRepository(User);
        let user: User;

        try {
            user = await userRepository.findOneOrFail(id);
        } catch (e) {
            return res.status(400).json({ message: 'User not found' });
        }

        userRepository.delete(id);
        res.status(201).json({ message: 'User Deleted' });
    };


}

export default UserController;