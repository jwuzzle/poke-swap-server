const express = require("express");
const router = express.Router();
const postsController = require('../controllers/posts-controller');

router
    .route('/:id')
    .get(postsController.getPostsByCardId)
    .post(postsController.createPosts);

    router
    .route('/:user_id')
    .get(postsController.getPostsByUserId)


module.exports = router;