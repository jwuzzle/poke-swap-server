const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const { uuid } = require('uuidv4');
const bcrypt = require('bcrypt');
require("dotenv").config();

const jsonSecretKey = process.env.jsonSecretKey

const register = async (req, res) => {
    /* try {
        const { first_name, last_name, username, email, password } = req.body;
        if (!first_name || !last_name || !username || !email || !password) {
            console.log(first_name)
            console.log(last_name)
            console.log(username)
            console.log(email)
            console.log(password)
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) throw err;
                console.log(bcrypt)
                const result = await knex("users").insert({
                    id: uuid,
                    first_name: first_name,
                    last_name: last_name,
                    username: username,
                    email: email,
                    password: hash
                });

                const newUserId = result[0];
                const [createdUser] = await knex("users").where({ id: newUserId });
                console.log("Created User:", createdUser)
                const token = jwt.sign({
                    id: createdUser.id,
                    firstname: createdUser.first_name,
                    username: createdUser.username,
                    email: createdUser.email
                }, jsonSecretKey)
                res.status(201).json({ token });
            });
        } else {
            res.status(403).json({message: "Missing required fields."});
        }
    } catch (error) {
        res.status(400).json({
            message: `Unable to create new user ${error}`
        });
    }
}; */


    if (!req.body.first_name || !req.body.last_name || !req.body.username || !req.body.email || !req.body.password_hash) {
        return res.status(400).json({
            message: "Please provide all required information for the new user in the request",
        });
    }

    try {

        const hashedPassword = await bcrypt.hash(req.body.password_hash, 10);
        const user = {
            ...req.body,
            password_hash: hashedPassword
        };

        const [newUserId] = await knex("users").insert(user);
        const [createdUser] = await knex("users").where({ id: newUserId });
        console.log("Created User:", createdUser)
        const token = jwt.sign({
            id: createdUser.id,
            firstname: createdUser.first_name,
            username: createdUser.username,
            email: createdUser.email
        }, jsonSecretKey)
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({
            message: `Unable to create new user ${error}`
        })
    }
};



module.exports = {
    register
};