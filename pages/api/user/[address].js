import dbConnect from "../../../utils/dbConnect"
import User from "../../../models/User"

export default async function CreateUser(req, res){
   const { method, body } = req;
   const { address } = req.query;
   console.log(body)
   await dbConnect()
   switch(method){
      case "GET":
         try {
            const users = await User.findOne({ address: address });
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
            const user = await User.create({
               username: body.username,
               bio: body.bio,
               email: body.email,
               address: address,
               photo_profile: body.photo_profile,
               banner: body.banner,
               sites: body.sites
            });
            res.status(200).json({
               message: "User Created.",
               data: user
            })
         } catch (error) {
            res.status(400).json({
               message: "Failed user created.",
               error: error
            })
         }
      default:
         res.status(400).json({ message: "error" }) 
   }
}