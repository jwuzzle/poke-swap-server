const axios = require('axios');

const fetchPokeapiData = async (name) => {
    try {
        let url = 'https://api.pokemontcg.io/v2/cards';
        const response = await axios.get(url, {
            headers: {
                accept: 'application/json',
                'X-Api-Key': 'efea9328-1f8a-4d03-b9e0-8c92622329c1'
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
    fetchPokeapiData
};