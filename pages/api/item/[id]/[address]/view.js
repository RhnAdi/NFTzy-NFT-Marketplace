import ItemModel from "../../../../../models/Item"
import dbConnect from "../../../../../utils/dbConnect"

export default async function handler (req, res) {
   await dbConnect();
   const { id, address } = req.query;
   switch(req.method) {
      case "POST":
         try {
            const item = await ItemModel.findById(id);
            item.viewer = [...item.viewer, address];
            await item.save().then(result => {
               res.status(200).json({
                   msg: "View Success",
                   data: result
               })
               .catch(error => {
                  res.status(400).json({msg: "View, Like error"})
               })
            });
         } catch (error) {
            res.status(400).json({msg: "View error", error: error})
         }
      case "DELETE":
         try {
            const item = await ItemModel.findById(id);
            const view = await item.viewer.filter(val => val !== address);
            item.viewer = view;
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