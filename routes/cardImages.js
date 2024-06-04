const express = require("express");
const router = express.Router();
const fs = require('fs');


const FILE_PATH = "./data/cardImages.json";
const FILE_PATH2 = "./data/cardImages2.json";

const readStates = () => {
    const cardImagesFile = fs.readFileSync(FILE_PATH);
    const cardImages = JSON.parse(cardImagesFile);
    const offset = Math.floor(Math.random() * (cardImages.length-14));
    const paginatedData = cardImages.slice(offset, offset + 13);
    console.log(paginatedData)
    return paginatedData;
}

const readStates2 = () => {
    const cardImagesFile2 = fs.readFileSync(FILE_PATH2);
    const cardImages2 = JSON.parse(cardImagesFile2);
    const offset2 = Math.floor(Math.random() * (cardImages2.length-12));
    const paginatedData2 = cardImages2.slice(offset2, offset2 + 12);
    console.log(paginatedData2)
    return paginatedData2;
}


//GET all states
router.get('/', (req, res) => {
    const paginatedData = readStates()
    res.status(200).json(paginatedData);
})

router.get('/second', (req, res) => {
    const paginatedData2 = readStates2()
    res.status(200).json(paginatedData2);
})


module.exports = router;