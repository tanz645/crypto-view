const express = require("express");
const {
    getTransactions
} = require("../controllers/cryptoTransactionsController.js");

const validations = require("../validations/cryptoTransactions.js")
const validationMiddleware = require("../middleware/validations.js")

const router = express.Router();

// GET nft metadata by token
router.get("/", validationMiddleware(validations.getWalletTransactions), getTransactions);


module.exports = router;
