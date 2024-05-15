const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const pokeapiRoutes = require('./routes/pokeapi');
const PORT = process.env.PORT || 9080


app.use(cors());
app.use(express.json());

app.use('/', pokeapiRoutes);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})