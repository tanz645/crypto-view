const Joi = require('joi') 
const validations = { 
  getWalletTransactions: Joi.object().keys({ 
    address: Joi.string().regex(/^0x[a-fA-F0-9]{40}$/).required(),
    from: Joi.date().less(Joi.ref('to')).required(),
    to: Joi.date().required()
  }) 
}; 
module.exports = validations;