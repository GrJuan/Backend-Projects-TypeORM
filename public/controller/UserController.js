"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/user/User");
const class_validator_1 = require("class-validator");
const jwt = require("jsonwebtoken");
require('dotenv').config();
class UserController {
}
exports.UserController = UserController;
_a = UserController;
//CONSUTAR TODOS LOS USUARIOS
UserController.getAll = async (req, res) => {
    const userRepository = (0, typeorm_1.getRepository)(User_1.User);
    let users;
    try {
        users = await userRepository.find({ relations: ["project"] });
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
//CREAR NUEVO USUARIO
UserController.newUser = async (req, res) => {
    const { password, email, firstName, lastName, role, dateTime, gender, country } = req.body;
    const user = new User_1.User();
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
    user.role = role;
    user.activityDate = dateTime;
    //VALIDAR
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await (0, class_validator_1.validate)(user, validationOpt);
    if (errors.length > 0) {
        return res.status(401).json({ message: errors });
    }
    ;
    const userRepository = (0, typeorm_1.getRepository)(User_1.User);
    //validate Duplicate Username And Email
    try {
        const existUser = await userRepository.findOneOrFail({ where: { email } });
        if (existUser) {
            return res.status(400).json({ message: "Email is already in use." });
        }
    }
    catch (e) {
    }
    let code = (Math.random() + 1).toString(36).substring(7);
    user.hashPassword();
    token = jwt.sign({ userId: user.id, email: user.email, code: code }, 'jams32ubaud2AS@', { expiresIn: '1h' });
    user.activationCode = code;
    await userRepository.save(user);
    try {
        res.status(201).json({ message: "User Created" });
    }
    catch (error) {
        res.status(400).json({ message: "An error occurred with validation!" });
    }
};
exports.default = UserController;
//# sourceMappingURL=UserController.js.map