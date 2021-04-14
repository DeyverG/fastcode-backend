const nodemailer = require('nodemailer'); // email sender function
const User = require('../models/User');
const shortid = require('shortid');

exports.sendEmail = async (req, res, next) => {

    const { email } = req.body

    if (!email) {
        res.status(400).json({ msg: 'No a enviado ningun correo valido' });
        return next()
    }

    let user = await User.findOne({ email })
    console.log(user)

    if (!user) {
        res.status(400).json({ msg: 'Esta cuenta no Existe' });
        return next()
    }

    const token = shortid.generate();
    user.token = token;
    await user.save()

    // nodemailer stuff will go here
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Reset Password',
        html: ` 
        <div> 
        <p>Hola ${user.name}</p> 
        <p>Si solicitaste Restablecer tu contraseña ingresa al link:</p> 
        <a href="http://localhost:3000/resetpassword/${token}">Aqui</a> 
        <p>De lo contrario ignora el Correo</p> 

        </div> 
    `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(500, error.message);
        } else {
            console.log("Email sent");
            res.json({msg: "Se a enviado un correo de restablecimiento"});
        }
    });
};