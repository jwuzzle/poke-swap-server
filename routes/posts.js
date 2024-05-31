const express = require("express");
const router = express.Router();
const postsController = require('../controllers/posts-controller');

router
    .route('/').get(postsController.getPostsByCardId)

router
    .route('/:id')
    .post(postsController.createPosts)
    .put(postsController.editPost)
    .delete(postsController.deletePost);

router
    .route('/user')
    .get(postsController.getPostsByUserId)

router
    .route('/:id')
    .post(postsController.createPosts)
    .put(postsController.editPost)
    .get(postsController.getSinglePostById);


module.exports = router;