const express = require('express');
const routes = express.Router();
const AuthController = require('../controllers/AuthController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

routes.post('/',
    [
        check('email', 'Digite un Email Valido').notEmpty(),
        check('password', 'La contraseña no puede ir vacia').notEmpty()
    ],
    AuthController.login
)

routes.get('/',
    auth,
    AuthController.authenticatedUser
)

routes.post('/resetpass',
    [
        check('password', 'Password debe ser de minimo 8 caracteres').isLength({ min: 8 }),
        check('repeatPassword', 'RepeatPassword debe ser de minimo 8 caracteres').isLength({ min: 8 })
        
    ],
    AuthController.resetPassword
)

module.exports = routes;