import ItemModel from "../../../../models/Item";

export default async function handler (req, res) {
   const { id } = req.query;
   const method = req.method;
   switch(method) {
      case "GET":
         try {
            const item = await ItemModel.findOne({ token_id: id });
            res.status(200).json({msg: "Get data success", data: item});
         } catch (error) {
            res.status(400).json({msg: "Get data failed", error: error});
         }
      default:
         res.status(400);
   }
}