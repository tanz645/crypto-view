const CryptoTransactionsSchema = require("../models/cryptoTransactionModel");

const getTransactions = async (req, res) => {
  try {
    const transactions = []
    const response = await fetch(`https://api.etherscan.io/api?chainid=1&module=account&action=txlist&address=${req.query.address}&sort=desc&apikey=H4VYH23QXIWKZAUXNTGWEZXBVPHH8SH813`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    const from = new Date(req.query.from).getTime()
    const to = new Date(req.query.to).getTime()
    const bulkOps = [];
    if(data && data.result && data.result.length > 0){
      for(let i=0; i<data.result.length;i++){
        const transaction = data.result[i];
        if(transactions.length < 5) {         
          if(transaction.timeStamp ) {
            const timestamp = new Date(Number(transaction.timeStamp)*1000).getTime()
            if(timestamp >= from && timestamp <= to) {
              transactions.push(transaction)
              bulkOps.push({
                'updateOne': {
                  'filter': { 'address': req.query.address, 'transaction_index': transaction.transactionIndex },
                  'update': {
                    address: req.query.address,
                     transaction_index: transaction.transactionIndex,
                     details: transaction
                  },
                  'upsert': true
              }})
            }
            
          }
        }
      }
    }
    await CryptoTransactionsSchema.bulkWrite(bulkOps)
    res.status(200).json({ data: transactions });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "Server error"
    });
  }
};

module.exports = { getTransactions };
