const knex = require("knex")(require("../knexfile"));

const createTradeAndTradeItem = async (req, res) => {
    const { offer_user, receive_user, status, postid } = req.body;

    const tradeResult = await knex("trades").insert({
        offering_user_id: offer_user,
        receiving_user_id: receive_user,
        status: status || "pending",
    })

    const tradeItemResult = await knex("trade_items").insert({
        trade_id: tradeResult,
        user_card_id: postid
    })
    res.status(201).json({ message: 'Trade and trade item records created successfully', trade: tradeResult[0], tradeItem: tradeItemResult[0],});
    try {
    } catch (error) {
        res.status(400).json({
            message: `Unable to create new card trade ${error}`
        })
    }
};

/* const createTradeItem = async (req, res) => {
    const { , postid } = req.body;

    const result = await knex("trades").insert({
        trade_id: 
        user_card_id: postid
    });
    res.status(201).json({ message: 'Trade record created successfully', trade: result[0] });
    try {
    } catch (error) {
        res.status(400).json({
            message: `Unable to create new card trade ${error}`
        })
    }
}; */


const getOffTradesByUserId = async (req, res) => {
    try {
        const { userId } = req.query;
        const allOffTradesByUserId = await knex("trades")
            .where({ "offering_user_id": userId })
            .join("users", "trades.receiving_user_id", "=", "users.id")
            .join("trade_items", "trades.id", "=", "trade_items.trade_id")
        .join("posts", "trade_items.user_card_id", "=", "posts.id")
            .join("cards", "posts.card_id", "=", "cards.id") 
            .select("trades.*", "posts.*", "cards.*", "trade_items.*", "users.*");
        res.status(200).json(allOffTradesByUserId);
    } catch (error) {
        res.status(404).json({
            message: "Error fetching card records by user ID"
        })
    }
};

const getRecTradesByUserId = async (req, res) => {
    try {
        const { userId } = req.query;
        const allRecTradesByUserId = await knex("trades")
            .where({ "receiving_user_id": userId })
            .join("users", "trades.offering_user_id", "=", "users.id")
            .join("trade_items", "trades.id", "=", "trade_items.trade_id")
        .join("posts", "trade_items.user_card_id", "=", "posts.id")
            .join("cards", "posts.card_id", "=", "cards.id") 
            .select("trades.*", "posts.*", "cards.*", "trade_items.*", "users.*");
        res.status(200).json(allRecTradesByUserId);
    } catch (error) {
        res.status(404).json({
            message: "Error fetching card records by user ID"
        })
    }
};


module.exports = {
    createTradeAndTradeItem,
    getOffTradesByUserId,
    getRecTradesByUserId
};