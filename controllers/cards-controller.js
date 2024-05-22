const knex = require("knex")(require("../knexfile"));

const getCardApiDetails = async (req, res) => {
    try {
        const allCards = await knex("cards")
        .where({api_card_id: req.params.id,
        })
        if(allCards.length === 0) {
            return res.status(404).json({message: 'Card record not found with this ID'})
        }
        res.status(200).json({message: 'Card record found', card: allCards});
    } catch (error) {
        res.status(404).json({
            message: `No card record exists ${error}`
        })
    }
};


const postCardApiDetails = async (req, res) => {
    try {
        const { api_card_id, name, set, image_url } = req.body;

        const result = await knex("cards").insert({
            api_card_id: api_card_id,
            name: name,
            set: set, 
            image_url: image_url
        });
        res.status(201).json({message: 'Card record created successfully', card: result[0]});
    } catch (error) {
        res.status(400).json({
            message: `Unable to create new card record ${error}`
        })
    }
};

module.exports = {
    getCardApiDetails,
    postCardApiDetails
};