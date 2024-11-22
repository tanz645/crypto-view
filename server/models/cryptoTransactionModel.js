const mongoose = require("mongoose");
const { Schema } = mongoose;

const CryptoTransactionsSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  transaction_index: {
    type: String,
    required: true,
  },
  details: {
    type: Object,
  },
}, { timestamps: true });

CryptoTransactionsSchema.index({ address: 1, transaction_index: 1 }, {unique: true}); 
module.exports = mongoose.model("crypto_transactions", CryptoTransactionsSchema);
