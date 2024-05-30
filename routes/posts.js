const express = require("express");
const router = express.Router();
const postsController = require('../controllers/posts-controller');

router
    .route('/').get(postsController.getPostsByCardId)

router
    .route('/:id')
    .post(postsController.createPosts)
    .put(postsController.editPost);

router
    .route('/user')
    .get(postsController.getPostsByUserId)


module.exports = router;