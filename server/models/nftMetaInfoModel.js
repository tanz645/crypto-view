const mongoose = require("mongoose");
const { Schema } = mongoose;

const NftMetaInfoSchema = new Schema({
  contract: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  meta_data: {
    type: Object,
  },
}, { timestamps: true });

NftMetaInfoSchema.index({ contract: 1, token: 1 }, {unique: true}); 
module.exports = mongoose.model("nft_meta_info", NftMetaInfoSchema);
