const express = require('express');
const router = express.Router();
const pokeapiController = require('../controllers/pokeapi-controller');

router
.get('/', pokeapiController.getExternalPokeapiData)
.get('/', pokeapiController.getExternalPokeapiDataByName);

module.exports = router;