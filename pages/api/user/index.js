import dbConnect from "../../../utils/dbConnect"
import User from "../../../models/User"

export default async function CreateUser(req, res){
   const { method, body } = req;
   await dbConnect()
   switch(method){
      case "GET":
         try {
            const users = await User.find();
            res.status(200).json({
               message: "Get users successfully.",
               data: users
            })
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
            new_user.address = body.address;
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
      case "PUT":
         User.findOne({address: body.address})
         .then(async (user) => {
            const {username, email, photo_profile, banner, bio, sites, address} = body;
            user.username = username;
            user.email = email;
            user.photo_profile = photo_profile;
            user.banner = banner;
            user.bio = bio;
            user.sites = sites;
            user.address = address;
            console.log(user)
            const data = await user.save()
            console.log(data)
            res.status(200).json({
               message: "User Updated.",
               data: data
            })
         })
         .catch((error) => {
            res.status(400).json({
               message: "Failed User Updated.",
               error: error
            })
         })
      default:
         res.status(500) 
   }
}