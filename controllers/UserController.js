const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

exports.userCreate = async (req, res, next) => {

    //Validar que no Existan errores
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }

    const { email, password } = req.body;

    // Verificar si el Usuario ya existe o correo en uso
    let user = await User.findOne({ email });

    if (user) {
        return res.status(400).json({ msg: 'El Correo ya esta en Uso.' });
    }

    // Crear el nuevo usuario
    user = new User(req.body);

    //Hashear el password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Guardar el Usuario
    try {
        await user.save();
        res.json({msg: 'Usuario Creado Correctamente'})
    } catch (error) {
        console.log(error)
    }
}