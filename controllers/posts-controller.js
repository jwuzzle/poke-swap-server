const knex = require("knex")(require("../knexfile"));

const getPostsByUserId = async (req, res) => {
    try {
        const { userId } = req.query;
        const allPostsByUserId = await knex("posts")
            .where({ user_id: userId })
            .join("users", "posts.user_id", "=", "users.id")
            .join("cards", "posts.card_id", "=", "cards.id")
            .select("posts.*", "users.username", "cards.name", "cards.api_card_id", "cards.set");
        res.status(200).json(allPostsByUserId);
    } catch (error) {
        res.status(404).json({
            message: "Error fetching card records by user ID"
        })
    }
};

const getPostsByCardId = async (req, res) => {
    try {
        console.log("Received request");
        const { cardId } = req.query;
        const allPostsByCardId = await knex("posts")
            .where({ card_id: cardId })
            .join("users", "posts.user_id", "=", "users.id")
            .join("cards", "posts.card_id", "=", "cards.id")
            .select("posts.*", "users.username", "cards.name", "cards.api_card_id");
        res.status(200).json({/* message: 'Card record(s) by specific card found',  */cards: allPostsByCardId });
    } catch (error) {
        res.status(404).json({
            message: "Error fetching card records by card ID"
        })
    }
};

const createPosts = async (req, res) => {
    const { user_id, card_id, status, condition, quantity, front_image_url, back_image_url } = req.body;

    const result = await knex("posts").insert({
        user_id: user_id,
        card_id: card_id,
        status: status || "available",
        condition: condition,
        quantity: quantity,
        front_image_url: front_image_url,
        back_image_url: back_image_url
    });
    res.status(201).json({ message: 'Post record created successfully', post: result[0] });
    try {
    } catch (error) {
        res.status(400).json({
            message: `Unable to create new card post ${error}`
        })
    }
};

const editPost = async (req, res) => {
    try {
        const postRowUpdated = await knex("posts")
            .where({ id: req.params.id })
            .update(req.body);

        if (postRowUpdated === 0) {
            return res.status(404).json({
                message: `Post with ID ${req.params.id} not found`
            });
        }

        const updatedPost = await knex("posts")
            .where({ id: req.params.id });
        res.json(updatedPost[0]);

    } catch (error) {
        res.status(500).json({
            message: `Unable to update post with ID ${req.params.id}: ${error}`
        });
    }
};

const getSinglePostById = async (req, res) => {
    try {
        const data = await knex("posts").where({ "posts.id": req.params.id }).join("users", "posts.user_id", "=", "users.id")
            .select("posts.*", "users.username").first();
        if (!data) {
            return res.status(404).json({
                message: `Post with ID ${req.params.id} not found`,
            });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ message: `Error retriving post: ${error}` })
    }
};


module.exports = {
    getPostsByUserId,
    getPostsByCardId,
    createPosts,
    editPost,
    getSinglePostById
};