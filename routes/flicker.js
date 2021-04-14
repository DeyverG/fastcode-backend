const express = require('express');
const routes = express.Router();
const FlickerController = require('../controllers/FlickerController');
const auth = require('../middleware/auth');


routes.post('/',
    auth,
    FlickerController.search
)


module.exports = routes;