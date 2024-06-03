const express = require("express");
const router = express.Router();
const tradesController = require('../controllers/trades-controller');

router
.route('/')
.post(tradesController.createTradeAndTradeItem)

router
.route('/offering')
.get(tradesController.getOffTradesByUserId)

router
.route('/receiving')
.get(tradesController.getRecTradesByUserId)


module.exports = router;