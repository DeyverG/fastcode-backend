const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('DB conectada')
    } catch (error) {
        console.log('se Produjo un error');
        console.log(error)
        process.exit(1);
    }
}

module.exports = connectDB;