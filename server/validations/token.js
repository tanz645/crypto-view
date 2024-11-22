const Joi = require('joi') 
const validations = { 
  getBalance: Joi.object().keys({ 
    token_address: Joi.string().regex(/^0x[a-fA-F0-9]{40}$/).required(),
    holder_address: Joi.string().regex(/^0x[a-fA-F0-9]{40}$/).required()
  }) 
}; 
module.exports = validations;