import { Router } from "express";

//imports
import { UserController } from "../controller/UserController";
import { checkJwt } from "../middlewares/jwt";

const router = Router();

//LEER TODOS LOS USUARIOS
router.get('/', UserController.getAll);

router.post('/', UserController.newUser)

export default router;

//PERMISOS DE ADMIN
//checkRole(['admin'])

//PERMISO AUTH CON TOKEN
//[checkJwt]