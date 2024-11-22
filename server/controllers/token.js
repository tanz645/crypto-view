const web3 = require("../services/web3.js");

const getBalance = async (req, res) => {
  try {
    let tokenAddress = req.query.token_address;
    let walletAddress = req.query.holder_address;

    const balanceOfABI = [
      {
        constant: true,
        inputs: [
          {
            name: "_owner",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            name: "balance",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ];
    const contract = new web3.eth.Contract(balanceOfABI, tokenAddress);
    const balance = await contract.methods.balanceOf(walletAddress).call();
    console.log(balance)
    res.status(200).json({ data: web3.utils.fromWei(balance, "ether") });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "Server error"
    });
  }
};

module.exports = { getBalance };
