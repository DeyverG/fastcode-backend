const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if(authHeader){
        //Obtener el Token
        const token = authHeader.split(' ')[1];

        try {
            //Comprobar el JWT
            const user = jwt.verify(token, process.env.SECRET_KEY);

            req.user = user;
        } catch (error) {
            res.status(401).json({ error });
            console.log('JWT no valido');
            
        }
    }
    return next();
}