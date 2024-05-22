const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const pokeapiRoutes = require('./routes/pokeapi');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const postsRoutes = require('./routes/posts');
const knex = require("knex")(require("./knexfile"));
const jwt = require("jsonwebtoken")
const PORT = process.env.PORT || 9080


app.use(cors());
app.use(express.json());
const jsonSecretKey = process.env.jsonSecretKey

app.use('/', pokeapiRoutes);
app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);
app.use('/posts', postsRoutes)

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


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})