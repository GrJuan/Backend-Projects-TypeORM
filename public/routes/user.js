"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//imports
const UserController_1 = require("../controller/UserController");
const router = (0, express_1.Router)();
//LEER TODOS LOS USUARIOS
router.get('/', UserController_1.UserController.getAll);
router.post('/', UserController_1.UserController.newUser);
exports.default = router;
//PERMISOS DE ADMIN
//checkRole(['admin'])
//PERMISO AUTH CON TOKEN
//[checkJwt]
//# sourceMappingURL=user.js.map