import Item from "../../../models/Item";
import dbConnect from "../../../utils/dbConnect"

export default async function handler (req, res) {
   const { method, body } = req;
   await dbConnect();
   switch(method){
      case "GET":
         try {
            const Items = await Item.find();
            res.status(200).json({msg: "Get Items success", data: Items})
         } catch (error) {
            res.status(400).json({msg: "Get Items failed", error: error})
         }
      case "POST":
         try {
            const new_item = new Item({
               item_id: body.item_id,
               token_id: body.token_id,
               token_uri: body.token_uri,
               seller: body.seller,
               owner: body.owner,
               price: body.price,
            })
            const history = new_item.history.create({ type: "minted", from: body.seller, to: body.owner, tx_hash: body.tx_hash })
            new_item.history.push(history)
            // const data = await Item.create({
            //    item_id: body.item_id,
            //    token_id: body.token_id,
            //    token_uri: body.token_uri,
            //    seller: body.seller,
            //    owner: body.owner,
            //    price: body.price,
            //    history: [
            //       { type: "minted", from: body.seller, to: body.owner, tx_hash: body.tx_hash }
            //    ]
            // })
            const data = await new_item.save();
            res.status(200).json({msg: "Item created success", data: data})
         } catch (error) {
            res.status(400).json({msg: "Item created error", error: error})
         }
      default:
         res.status(400)
   }
}