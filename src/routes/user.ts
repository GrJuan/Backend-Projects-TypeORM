import { Router } from "express";

//imports
import { UserController } from "../controller/UserController";
import { checkJwt } from "../middlewares/jwt";

const router = Router();

router.get('/', UserController.getAllUsers);

router.post('/', UserController.newUser);

router.get('/:id', UserController.getUserById);

router.put('/edite/:id', UserController.editeUser);

router.delete('/delete/:id', UserController.deleteUser);

export default router;

//PERMISOS DE ADMIN
//checkRole(['admin'])

//PERMISO AUTH CON TOKEN
//[checkJwt]