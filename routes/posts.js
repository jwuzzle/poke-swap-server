const express = require("express");
const router = express.Router();
const postsController = require('../controllers/posts-controller');

router
    .route('/card/:id')
    .get(postsController.getPostsByCardId)
    .post(postsController.createPosts);

    router
    .route('/user/:user_id')
    .get(postsController.getPostsByUserId)


module.exports = router;