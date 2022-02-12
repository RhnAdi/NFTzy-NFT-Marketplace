import ItemModel from "../../../models/Item";

export default async function handler (req, res) {
   const { keyword } = req.query;
   switch (req.method) {
      case "GET":
         const data = await ItemModel.find(
            {
               $or: [
                  { name: { '$regex': keyword.toLowerCase()  } },
                  { description: { "$regex": keyword.toLowerCase() } },
                  { seller: { "$regex": keyword } },
                  { owner: { "$regex": keyword } },
               ]
            }
         )
         return res.status(200).json({msg: "ok", data})
      default: 
         return res.status(500).json({msg: "Server Error!!"})
   }
}