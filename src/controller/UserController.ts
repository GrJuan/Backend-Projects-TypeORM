import { getMongoManager, getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/user/User";
import { validate } from "class-validator";
import * as jwt from "jsonwebtoken";
import { Project } from '../entity/projects/Project';
require('dotenv').config();

export class UserController {
    //CONSUTAR TODOS LOS USUARIOS
    static getAll = async (req: Request, res: Response) => {

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

    //CREAR NUEVO USUARIO
    static newUser = async (req: Request, res: Response) => {
        const { password, email, firstName, lastName, role, dateTime, gender, country  } = req.body;
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

}

export default UserController;