const express = require('express');
const routes = express.Router();
const MailController = require('../controllers/MailController');
const { check } = require('express-validator');
//email route
routes.post('/',
    [
        check('email', 'Digite un Email valido').isEmail()
    ],
    MailController.sendEmail
);

module.exports = routes;