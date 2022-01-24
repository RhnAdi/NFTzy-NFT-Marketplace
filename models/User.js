import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true
   },
   bio: {
      type: String,
   },
   photo_profile: {
      type: String,
      required: true
   },
   banner: {
      type: String,
   },
   email: {
      type: String,
   },
   sites: {
      type: [String]
   },
   address: {
      type: String,
      required: true
   }
})

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);