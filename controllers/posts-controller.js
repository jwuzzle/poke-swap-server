const knex = require("knex")(require("../knexfile"));

const getPostsByUserId = async (req, res) => {
    try { 
        const allPostsByUserId = await knex("posts")
        .where({user_id: req.body.id})
        res.status(200).json({message: 'Card record(s) by user found', cards: allPostsByUserId});
    } catch (error) {
        res.status(404).json({
            message: "Error fetching card records by user ID"
        })
    }
};

const getPostsByCardId = async (req, res) => {
    try { 
        const allPostsByCardId = await knex("posts")
        .where({card_id: req.body.id})
        res.status(200).json({message: 'Card record(s) by specific card found', cards: allPostsByCardId});
    } catch (error) {
        res.status(404).json({
            message: "Error fetching card records by card ID"
        })
    }
};

const createPosts = async (req, res) => {
    const { user_id, card_id, status, condition, quantity, image_url } = req.body;

    const result = await knex("posts").insert({
        user_id: user_id,
        card_id: card_id,
        status: status || "available",
        condition: condition,
        quantity: quantity,
        image_url: image_url
    });
    res.status(201).json({message: 'Post record created successfully', post: result[0]});
    try { 
    } catch (error) {
        res.status(400).json({
            message: `Unable to create new card post ${error}`
        })
    }
};


module.exports = {
    getPostsByUserId,
    getPostsByCardId,
    createPosts
};