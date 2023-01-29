"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProjectController_1 = require("../controller/ProjectController");
const router = (0, express_1.Router)();
router.post('/', ProjectController_1.default.createProject);
router.get('/', ProjectController_1.default.getAllProjects);
exports.default = router;
//# sourceMappingURL=project.js.map