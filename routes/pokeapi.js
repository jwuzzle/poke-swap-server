const express = require('express');
const router = express.Router();
const pokeapiController = require('../controllers/pokeapi-controller');

router.get('/', pokeapiController.getExternalPokeapiData);

module.exports = router;