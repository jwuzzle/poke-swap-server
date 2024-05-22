const express = require("express");
const router = express.Router();
const cardsController = require('../controllers/cards-controller');

router
    .route('/details')
    .post(cardsController.postCardApiDetails);

module.exports = router;