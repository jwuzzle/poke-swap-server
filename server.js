const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const pokeapiRoutes = require('./routes/pokeapi');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const postsRoutes = require('./routes/posts');
const cardImages = require('./routes/cardImages');
const tradesRoutes = require('./routes/trades');
const knex = require("knex")(require("./knexfile"));
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 9080


app.use(cors());
app.use(express.json());
const jsonSecretKey = process.env.jsonSecretKey

app.use('/', pokeapiRoutes);
app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);
app.use('/posts', postsRoutes);
app.use('/cardimages', cardImages);
app.use('/trades', tradesRoutes);

app.use((req, res, next) => {
    if (req.url === "/signup" || req.url === "/login") {
        next();
    } else {
        const token = getToken(req);

        if (token) {
            console.log('Auth Token:', token);
            if (jwt.verify(token, jsonSecretKey)) {
                req.decode = jwt.decode(token);
                next();
            } else {
                res.status(403).json({ error: "Not Authorized." });
            }
        } else {
            res.status(403).json({ error: "No token. Unauthorized." });
        }
    }
});

function getToken(req) {
    if (!req.headers.authorization) {
        return;
    } else {
        return req.headers.authorization.split(" ")[1];
    }
}

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
 
    try {
        const usersArray = await knex.select("*").from("users").where({ username }).first();
        const hash = usersArray.password_hash;
        const id = usersArray.id;
        const first_name = usersArray.first_name;
        const email = usersArray.email;
        console.log(usersArray)
        console.log(`Fetched hash from DB: ${hash}`);

        bcrypt.compare(password, hash, (error, result) => {
            if (error) throw error;
            if (result) {
                const token = jwt.sign({ username, id, first_name, email }, jsonSecretKey)
                res.status(200).json( { token })
            } else {
                res.status(401).json({ error: "Invalid username or password" }); 
            }
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({
            token: "",
            error: {
                message: "Internal server error. Please try again later."
            },
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})