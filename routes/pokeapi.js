const express = require('express');
const router = express.Router();
const pokeapiController = require('../controllers/pokeapi-controller');

router
.get('/all', pokeapiController.getExternalPokeapiData)
.get('/', pokeapiController.getExternalPokeapiDataByName)
.get('/set', pokeapiController.getExternalPokeapiDataBySetName)
.get('/allsets', pokeapiController.getExternalPokeapiDataAllSets);


module.exports = router;