"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require("nodemailer");
require('dotenv').config();
var sgTransport = require('nodemailer-sendgrid-transport');
var options = {
    auth: {
        api_key: process.env.SENDGRID_KEY
    }
};
exports.transporter = nodemailer.createTransport(sgTransport(options));
//# sourceMappingURL=mailer.js.map