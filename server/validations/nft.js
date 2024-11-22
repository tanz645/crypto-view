const Joi = require('joi') 
const validations = { 
  getNftMetaInfo: Joi.object().keys({ 
    token: Joi.string().required(),
    contract: Joi.string().required() 
  }) 
}; 
module.exports = validations;