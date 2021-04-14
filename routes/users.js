const express = require('express');
const routes = express.Router();
const UserController = require('../controllers/UserController');
const { check } = require('express-validator');


routes.post('/',
    [
        check('email','Suministre un correo valido').isEmail(),
        check('name', 'Debe digitar un Nombre').notEmpty(),
        check('password', 'La contraseña debe ser de minimo 8 Caracteres.').isLength({min: 8})
    ],
    UserController.userCreate
);

module.exports = routes;