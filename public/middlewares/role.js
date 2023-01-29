"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/user/User");
const checkRole = (roles) => {
    return async (req, res, next) => {
        const { userId } = res.locals.jwtPayload;
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        let user;
        try {
            user = await userRepository.findOneOrFail(userId);
        }
        catch (e) {
            return res.status(401).json({ message: 'No Authorized.' });
        }
        //Check Role
        const { role } = user;
        if (roles.includes(role)) {
            next();
        }
        else {
            res.status(401).json({ message: 'No Authorized.' });
        }
    };
};
exports.checkRole = checkRole;
//# sourceMappingURL=role.js.map