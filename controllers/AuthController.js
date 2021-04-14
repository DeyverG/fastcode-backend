const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {

    // Validar Errores
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array() })
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email })
    console.log(user)
    if (!user) {
        res.status(400).json({ msg: "El Usuario no existe." })
        return next()
    }

    //Verificar el Password
    if (bcrypt.compareSync(password, user.password)) {

        //Crear el JWT
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email,
            token: user.token
        }, process.env.SECRET_KEY, {
            expiresIn: '8h'
        })

        res.json({ token })
    } else {
        res.status(401).json({ msg: 'El Password es Incorrecto' })
        return next()
    }
}

exports.authenticatedUser = (req, res, next) => {
    res.json({ user: req.user })
}

exports.resetPassword = async (req, res, next) => {

    // Validar Errores
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { password, repeatPassword, token } = req.body

    if (!token) {
        res.status(400).json({ msg: 'Enlace invalido' });
        return next()
    }

    if (!password || !repeatPassword) {
        res.status(400).json({ msg: 'Llenar todos los campos' });
        return next()
    }

    if (password !== repeatPassword) {
        res.status(400).json({ msg: 'Las contraseñas no son iguales' });
        return next()
    }

    let user = await User.findOne({ token })

    if (!user) {
        res.status(400).json({ msg: 'Enlace No valido' });
        return next()
    }

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(password, salt);

    user.password = newPassword
    user.token = null

    await user.save();

    res.json({ msg: "Contraseña cambiada Exitosamente" })

}