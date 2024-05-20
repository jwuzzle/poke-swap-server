const externalPokeapi = require('../api-data/externalPokeapi');

const getExternalPokeapiData = async (req, res) => {
    try {
        console.log("Received request");
        const { name } = req.query;
        console.log("Name", name);
        const data = await externalPokeapi.fetchPokeapiData(name);
        res.json(data)
    } catch (error) {
        console.error()
    }
}

module.exports = {
    getExternalPokeapiData
};