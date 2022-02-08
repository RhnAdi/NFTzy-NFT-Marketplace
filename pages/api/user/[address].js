import dbConnect from "../../../utils/dbConnect"
import User from "../../../models/User"

export default async function CreateUser(req, res){
   const { method, body } = req;
   const { address } = req.query;
   dbConnect()
   switch(method){
      case "GET":
         try {
            const users = await User.findOne({ address: address });
            res.status(200).json({
               message: "Get users successfully.",
               data: users
            })
            return
         } catch (error){
            res.status(400).json({
               message: "Get users Failed.",
               error: error
            })
         }
      case "POST":
         try {
            const new_user = new User();
            new_user.username = body.username;
            new_user.bio = body.bio;
            new_user.email = body.email;
            new_user.address = address;
            new_user.photo_profile = body.photo_profile;
            new_user.banner = body.banner;
            new_user.sites = body.sites;
            const save = await new_user.save();
            res.status(200).json({
               message: "User Created.",
               data: save
            })
         } catch (error) {
            res.status(400).json({
               message: "Failed user created.",
               error: error
            })
         }
      case "PULL":
         try {
            const user = await User.find({address: address})
            user.username = body.username;
            user.bio = body.bio
            user.email = body.email;
            user.address = address;
            user.photo_profile = body.photo_profile;
            user.banner = body.banner;
            user.sites = body.sites;
            user.save()
            res.status(200).json({
               message: "Edit User Success.",
               data: user
            })
         } catch (error) {
            res.status(400).json({
               message: "Failed Edit User.",
               error: error
            })
         }
      default:
         return res.status(400)
   }
}