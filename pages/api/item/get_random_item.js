import ItemModel from "../../../models/Item";
import UserModel from "../../../models/User";
import sortAddress from "utils/sortAddress";
import dbConnect from "../../../utils/dbConnect";
import axios from "axios"

export default async function handler (req, res) {
   const { method } = req;
   await dbConnect();
   switch(method){
      case "GET":
         try {
            const count = await ItemModel.count();
            if(count === 0 ) return res.status(400).json({msg: "Nothing Item"})
            const random = Math.floor(Math.random() * (count - 1 + 1) + 1);
            const random_item = await ItemModel.findOne({ item_id: random });
            const user = await UserModel.findOne({ address: random_item.seller });
            const meta = await axios.get(random_item.token_uri);
            const data = {
               name: meta.data.name,
               image: meta.data.image,
               seller: random_item.seller,
               sort_address_seller: sortAddress(random_item.seller)
            }
            if(user) {
               data.username = user.username;
               data.photo_profile = user.photo_profile;
            }
            return res.status(200).json({mesg: "Get Random Item Success", data: data });
         } catch (error) {
            return res.status(400).json({msg: "Get Random Item Failed", error})
         }
      default:
         return res.status(500).json({msg: "Server Error"})
   }
}