const express = require("express");
const {
    getMetaData
} = require("../controllers/nftController.js");

const validations = require("../validations/nft.js")
const validationMiddleware = require("../middleware/validations.js")

const router = express.Router();

// GET nft metadata by token
router.get("/meta-info", validationMiddleware(validations.getNftMetaInfo), getMetaData);


module.exports = router;
