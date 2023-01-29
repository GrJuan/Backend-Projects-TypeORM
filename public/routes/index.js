"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//IMPORTS
const user_1 = require("./user");
const project_1 = require("./project");
const routes = (0, express_1.Router)();
routes.use('/users', user_1.default);
routes.use('/projects', project_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map