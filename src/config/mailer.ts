import  nodemailer = require('nodemailer');
require('dotenv').config();
var sgTransport = require('nodemailer-sendgrid-transport');

var options = {
    auth: {
        api_key: process.env.SENDGRID_KEY
    }
}

export const transporter = nodemailer.createTransport(sgTransport(options));