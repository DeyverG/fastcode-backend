const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Crear Servidor
const app = express();

//Conecta a la DB
connectDB()

//Habilitamos los Cors
const opcionesCors = {
    origin: process.env.FRONTEND_URL
}
app.use(cors(opcionesCors));

// Asignacion de puerto
const PORT = process.env.PORT || 4000

// Habilitamos leer valores de un Body Json
app.use(express.json());

//Rutas
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/search/flicker', require('./routes/flicker'))
app.use('/api/mail', require('./routes/mail'))

app.listen(PORT, () => {
    console.log('El servidor esta Conectado en el Puerto ' + PORT);
});

