import UserModel from "../../../models/User";
import ItemModel from "../../../models/Item";

export default async function handle (req, res) {
   const { method } = req;
   switch (method) {
      case "GET":
         const most_user = await ItemModel.aggregate([
            { $group: {_id: "$seller", totalItem: {$sum: 1}} }
         ]).sort({totalItem: -1}).limit(10);
         const data = await Promise.all(most_user.map(async(user, index) => {
            const profile = await UserModel.findOne({address: user._id});
            return {...user, profile}
         }))
         return res.status(200).json(data)
      default:
         return res.status(500).json({msg: "Server Error"})
   }
}