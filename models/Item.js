import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema({
   type: {
      type: String,
      enum: ['minted', 'transfer'],
      default: 'minted',
      required: true
   },
   from : {
      type: String,
      required: true
   },
   to: {
      type: String,
      required: true,
   },
   tx_hash: {
      type: String,
      required: true
   },
}, {
   timestamps: true,
})

const ItemSchema = new mongoose.Schema({
   item_id: {
      type: Number,
      required: true,
      unique: true
   },
   token_id: {
      type: Number,
      required: true,
      unique: true
   },
   token_uri: {
      type: String,
      required: true,
      unique: true,
   },
   seller: {
      type: String,
      required: true
   },
   owner: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   history: [HistorySchema]
},{
   timestamps: true
})


module.exports = mongoose.models.Item || mongoose.model('Item', ItemSchema);