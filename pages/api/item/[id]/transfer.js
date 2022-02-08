import ItemModel from "../../../../models/Item";
import web3 from "web3"
import { marketAddress, nftAddress } from "utils/address";

export default function handler (req, res) {
   const { body, query, method } = req;
   const { to, tx_hash, from } = body;
   const { id } = query;
   switch(method) {
      case "POST":
         
         ItemModel.findOne({ token_id: id })
         .then(async item => {
            if(item.owner == from){
               try {
                  const history = await item.history.create({ type: "transfer", from: item.owner, to: to, tx_hash: tx_hash });
                  item.owner = body.to;
                  item.history.push(history);
                  const transfer_item = await item.save();
                  return res.status(200).json({ msg: "Transfer Success", data:  transfer_item, data_history: history})
               } catch (error) {
                  return res.status(400).json({ msg: "Transfer Failed", error: error });
               }
            } else {
               return res.status(400).json({msg: "You are not owner."});
            }
         })
         .catch(error => {
            return res.status(400).json({msg: "Cannot find item", error: error})
         })
         return
      default:
         return res.status(500);
   }
}