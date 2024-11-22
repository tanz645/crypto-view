const NftMetaInfoSchema = require("../models/nftMetaInfoModel.js");
const web3 = require("../services/web3.js");

const getMetaData = async (req, res) => {
  try {
    const tokenContract = req.query.contract
    const tokenId = req.query.token
    const tokenURIABI = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "tokenURI",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    
    const contract = new web3.eth.Contract(tokenURIABI, tokenContract)
    const result = await contract.methods.tokenURI(tokenId).call()
    console.log(result)
    const request = new Request(result);
    const response = await fetch(request);
    const metadata = await response.json();
    const filter = {
        contract: tokenContract,
        token: tokenId
    }
    const update = {
        contract: tokenContract,
        token: tokenId,
        meta_data: metadata
    }
    await NftMetaInfoSchema.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true
      });
    res.status(200).json({data: metadata});
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "Server error"
    });
  }
};

module.exports = { getMetaData };
