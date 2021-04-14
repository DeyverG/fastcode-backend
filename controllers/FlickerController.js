const axios = require('axios');

exports.search = async (req, res, next) => {

    // Si el usuario esta Autenticado
    if (req.user) {
        const { tag } = req.body

        //Si no existe un tag enviar error
        if(!tag){
            return res.status(400).json({msg: 'No a enviado ningun tag'})
        }

        //de lo contrario realizar la busqueda
        const url = `${process.env.URL_API}?format=json&tags=${tag}&nojsoncallback=1`
        
        
        try {
            const response = await axios.post(url);
            res.json({photos: response.data.items})
        } catch (error) {
            res.status(400).json({msg: 'Se produjo un error en la busqueda'})
        }

        return next()
    }

    res.status(401).json({ msg: "Debe Loguearse Primero." })
}