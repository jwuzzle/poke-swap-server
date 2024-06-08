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
    res.status(201).json({ message: 'Trade and trade item records created successfully', trade: tradeResult[0], tradeItem: tradeItemResult[0], });
    try {
    } catch (error) {
        res.status(400).json({
            message: `Unable to create new card trade ${error}`
        })
    }
};

const getSingleTradeById = async (req, res) => {
    try {
        const data = await knex("trades").where({ "trades.id": req.params.id })
            .join("users as offering_user", "trades.offering_user_id", "=", "offering_user.id")
            .join("users as receiving_user", "trades.receiving_user_id", "=", "receiving_user.id")
            .join("trade_items", "trades.id", "=", "trade_items.trade_id")
            .select("trades.*", "offering_user.username as offering_username", "receiving_user.username as receiving_username", "trade_items.user_card_id as card_post_id");
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

const createTradeItem = async (req, res) => {
    const { postid, tradeid } = req.body;

    console.log(tradeid)
    console.log(postid)

    const result = await knex("trade_items").insert({
        trade_id: tradeid,
        user_card_id: postid
    });
    res.status(201).json({ message: 'Trade record created successfully', trade: result[0] });
    try {
    } catch (error) {
        res.status(400).json({
            message: `Unable to create new card trade ${error}`
        })
    }
};

const getOffTradesByUserId = async (req, res) => {
    try {
        const allOffTradesByUserId = await knex("trades")
            .where({ "offering_user_id": req.params.id })
            .join("users", "trades.receiving_user_id", "=", "users.id")
            .join("trade_items", "trades.id", "=", "trade_items.trade_id")
            .join("posts", "trade_items.user_card_id", "=", "posts.id")
            .join("cards", "posts.card_id", "=", "cards.id")
            .select(
                "trades.id as trade_id",
                "trades.status as trade_status",
                "trades.offering_user_id",
                "trades.receiving_user_id",
                "posts.id as post_id",
                "posts.user_id as posts_user_id",
                "posts.card_id as posts_card_id",
                "posts.status as posts_status",
                "posts.condition as posts_condition",
                "posts.quantity as posts_quantity",
                "posts.front_image_url as posts_front_image",
                "posts.back_image_url as posts_back_image",
                "cards.id as card_id",
                "cards.api_card_id as card_setId",
                "cards.name as card_name",
                "cards.set as card_setname",
                "trade_items.id as trade_items_id",
                "users.id as users_id",
                "users.username as users_username"

                /* "trades.*", "posts.*", "cards.*", "trade_items.*", "users.*" */);
        res.status(200).json(allOffTradesByUserId);
    } catch (error) {
        res.status(404).json({
            message: "Error fetching card records by user ID"
        })
    }
};

const getRecTradesByUserId = async (req, res) => {
    try {
        const allRecTradesByUserId = await knex("trades")
            .where({ "receiving_user_id": req.params.id, "posts.user_id": req.params.id })
            .join("users", "trades.receiving_user_id", "=", "users.id")
            .join("trade_items", "trades.id", "=", "trade_items.trade_id")
            .join("posts", "trade_items.user_card_id", "=", "posts.id")
            .join("cards", "posts.card_id", "=", "cards.id")
            .select(
                "trades.id as trade_id",
                "trades.status as trade_status",
                "trades.offering_user_id",
                "trades.receiving_user_id",
                "posts.id as post_id",
                "posts.user_id as posts_user_id",
                "posts.card_id as posts_card_id",
                "posts.status as posts_status",
                "posts.condition as posts_condition",
                "posts.quantity as posts_quantity",
                "posts.front_image_url as posts_front_image",
                "posts.back_image_url as posts_back_image",
                "cards.id as card_id",
                "cards.api_card_id as card_setId",
                "cards.name as card_name",
                "cards.set as card_setname",
                "trade_items.id as trade_items_id",
                "users.id as users_id",
                "users.username as users_username"

                /* "trades.*", "posts.*", "cards.*", "trade_items.*", "users.*" */);
        res.status(200).json(allRecTradesByUserId);
    } catch (error) {
        res.status(404).json({
            message: "Error fetching card records by user ID"
        })
    }
};

const getOffTradesPostByUserId = async (req, res) => {
    try {
        const { postUserId } = req.query;
        const allOffTradesPostByUserId = await knex("trade_items")
            .join("posts", "trade_items.user_card_id", "=", "posts.id")
            .where({ "trade_id": req.params.id, "posts.user_id": postUserId })
            .join("cards", "posts.card_id", "=", "cards.id")
            .select(
                "trade_items.*", "posts.*", "cards.*");
        res.status(200).json(allOffTradesPostByUserId);
    } catch (error) {
        res.status(404).json({
            message: "Error fetching card records by user ID"
        })
    }
};

const getRecTradesPostByUserId = async (req, res) => {
    try {
        const { postUserId } = req.query;
        const allRecTradesPostByUserId = await knex("trade_items")
            .join("posts", "trade_items.user_card_id", "=", "posts.id")
            .where({ "trade_id": req.params.id, "posts.user_id": postUserId })
            .join("cards", "posts.card_id", "=", "cards.id")
            .select(
                "trade_items.*", "posts.*", "cards.*");
        res.status(200).json(allRecTradesPostByUserId);
    } catch (error) {
        res.status(404).json({
            message: "Error fetching card records by user ID"
        })
    }
};

const updateTradeRow = async (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    const updateTradeRow = await knex("trades")
        .where({ id: req.params.id })
        .update(req.body);

    if (updateTradeRow === 0) {
        return res.status(404).json({
            message: `Trade with ID ${req.params.id} not found.`
        });
    }
    res.status(201).json({ message: 'Trade records updated successfully' });
    try {
    } catch (error) {
        res.status(400).json({
            message: `Unable to create new card trade ${error}`
        })
    }
};

const deleteOffererTradeItem = async (req, res) => {

    const { postids } = req.body;
    const { id } = req.params;

    console.log(postids)
    console.log(id)

    try {
        const rowsDeleted = await knex("trade_items")
            .where({
                trade_id: id
            })
            .whereIn("user_card_id", postids)
            .del();

        if (rowsDeleted === 0) {
            return res.status(404).json({ message: `Items are already not present` });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({
            message: `Unable to delete items: ${error}`
        });
    }
}



module.exports = {
    createTradeAndTradeItem,
    getSingleTradeById,
    getOffTradesByUserId,
    getRecTradesByUserId,
    updateTradeRow,
    getOffTradesPostByUserId,
    getRecTradesPostByUserId,
    createTradeItem,
    deleteOffererTradeItem
};


/* const getOffTradesByUserId = async (req, res) => {
    try {
        const { postUserId } = req.query;
        const allOffTradesByUserId = await knex("trade_items")
        .join("posts", "trade_items.user_card_id", "=", "posts.id")
            .where({ "trade_id": req.params.id, "posts.user_id": postUserId })
            .join("cards", "posts.card_id", "=", "cards.id")
            .select(
                "trade_items.*",  "posts.*", "cards.*");
        res.status(200).json(allOffTradesByUserId);
    } catch (error) {
        res.status(404).json({
            message: "Error fetching card records by user ID"
        })
    }
};

const getRecTradesByUserId = async (req, res) => {
try {
    const { postUserId } = req.query;
    const allRecTradesByUserId = await knex("trade_items")
    .join("posts", "trade_items.user_card_id", "=", "posts.id")
        .where({ "trade_id": req.params.id, "posts.user_id": postUserId })
        .join("cards", "posts.card_id", "=", "cards.id")
        .select(
            "trade_items.*",  "posts.*", "cards.*");
    res.status(200).json(allRecTradesByUserId);
} catch (error) {
    res.status(404).json({
        message: "Error fetching card records by user ID"
    })
}
}; */