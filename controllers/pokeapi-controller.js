const externalPokeapi = require('../api-data/externalPokeapi');


const getExternalPokeapiData = async (req, res) => {
    try {
        console.log("Received request");
        const data = await externalPokeapi.fetchPokeapiData();
        res.json(data)
    } catch (error) {
        console.error()
    }
}

const getExternalPokeapiDataByName = async (req, res) => {
    try {
        console.log("Received request");
        const { name } = req.query;
        console.log("Name", name);
        const data = await externalPokeapi.fetchPokeapiDataByName(name);
        res.json(data)
    } catch (error) {
        console.error()
    }
}

module.exports = {
    getExternalPokeapiData,
    getExternalPokeapiDataByName
};