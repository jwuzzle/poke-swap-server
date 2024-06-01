const express = require('express');
const router = express.Router();
const pokeapiController = require('../controllers/pokeapi-controller');

router
.get('/all', pokeapiController.getExternalPokeapiData)
.get('/', pokeapiController.getExternalPokeapiDataByName);

module.exports = router;