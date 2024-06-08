const express = require("express");
const router = express.Router();
const tradesController = require('../controllers/trades-controller');

router
    .route('/')
    .post(tradesController.createTradeAndTradeItem);

router
    .route('/:id')
    .get(tradesController.getSingleTradeById)
    .put(tradesController.updateTradeRow)
    .post(tradesController.createTradeItem)
    .delete(tradesController.deleteOffererTradeItem);

router
    .route('/offering/:id')
    .get(tradesController.getOffTradesByUserId);

router
    .route('/offering/:id/posts')
    .get(tradesController.getOffTradesPostByUserId);

router
    .route('/receiving/:id')
    .get(tradesController.getRecTradesByUserId);

router
    .route('/receiving/:id/posts')
    .get(tradesController.getRecTradesPostByUserId);


module.exports = router;