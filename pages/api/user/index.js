import dbConnect from "../../utils/dbConnect"
import User from "../../models/User"

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
            const user = await User.create(body);
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