const express = require("express");
const {
    getBalance
} = require("../controllers/token");

const validations = require("../validations/token")
const validationMiddleware = require("../middleware/validations.js")

const router = express.Router();

// GET nft metadata by token
router.get("/balance", validationMiddleware(validations.getBalance), getBalance);


module.exports = router;
