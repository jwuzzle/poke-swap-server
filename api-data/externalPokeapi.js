const axios = require('axios');
require("dotenv").config();

const apikey = process.env.pokeapikey;


const fetchPokeapiData = async (name) => {
    try {
        let url = 'https://api.pokemontcg.io/v2/cards';
        const offset = Math.floor(Math.random() * 1000);
        const response = await axios.get(url, {
            headers: {
                accept: 'application/json',
                'X-Api-Key': apikey
            },
            params: {
                pageSize: 12,
                page: offset
            }
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        res.status(400).send('Error fetching data from external API');
    }
}

const fetchPokeapiDataByName = async (name) => {
    try {
        let url = 'https://api.pokemontcg.io/v2/cards';
        const response = await axios.get(url, {
            headers: {
                accept: 'application/json',
                'X-Api-Key': apikey
            },
            params: {
                q: `name:"${name}"`
            }
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        res.status(400).send('Error fetching data from external API');
    }
}


module.exports = {
    fetchPokeapiData,
    fetchPokeapiDataByName
};