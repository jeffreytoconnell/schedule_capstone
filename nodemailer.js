// GET ALL THE TOOLS NEEDED
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var configDB = require('./config/database.js');
var Course = require('./app/models/course.js');
var nodemailer = require('nodemailer');
//var port = process.env.PORT || 8080;
let server;

var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: 'scheduler.099@gmail.com',
        pass: 'Gunner99'
    },
    tls: {
        rejectUnauthorized: false
    }
});
let helperOptions = {
    from : '"Scheduler App" <scheduler.099@gmail.com',
    to: 'jeffreytoconnell@gmail.com', // ??? req.user.???
    subject: 'Subject',
    text: 'TEXT' //  ???? req.body.??
};
transporter.sendMail(helperOptions, (error, info) => {
    if(error){
        console.log(error);
    }
    console.log("Message Sent");
    console.log(info);
})