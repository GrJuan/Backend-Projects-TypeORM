"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jwt = require("jsonwebtoken");
const checkJwt = (req, res, next) => {
    const token = req.headers['auth'];
    let jwtPayload;
    try {
        jwtPayload = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (e) {
        return res.status(401).json({ message: 'without authorization!' });
    }
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.setHeader('token', newToken);
    next();
};
exports.checkJwt = checkJwt;
//# sourceMappingURL=jwt.js.map