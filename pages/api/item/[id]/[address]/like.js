import ItemModel from "../../../../../models/Item"
import dbConnect from "../../../../../utils/dbConnect"

export default async function handler (req, res) {
   await dbConnect();
   const { id, address } = req.query;
   switch(req.method) {
      case "POST":
         try {
            const item = await ItemModel.findById(id);
            item.like = [...item.like, address];
            await item.save().then(result => {
               res.status(200).json({
                   msg: "Like Success",
                   data: result
               })
               .catch(error => {
                  res.status(400).json({msg: "Sorry, Like error"})
               })
            });
         } catch (error) {
            res.status(400).json({msg: "Like error", error: error})
         }
      case "DELETE":
         try {
            const item = await ItemModel.findById(id);
            const like = await item.like.filter(val => val !== address);
            item.like = like;
            await item.save().then(result => {
               res.status(200).json({
                   msg: "Remove Success",
                   data: result
               })
               .catch(error => {
                  res.status(400).json({msg: "Sorry, Remove error"})
               })
            });
         } catch (error) {
            res.status(400).json({msg: "Remove error", error: error})
         }
      default:
         res.status(400)
   }
}