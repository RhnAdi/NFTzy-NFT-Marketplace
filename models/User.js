import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true
   },
   bio: {
      type: String,
      default: ""
   },
   photo_profile: {
      type: String,
      default: ""
   },
   banner: {
      type: String,
      default: ""
   },
   email: {
      type: String,
      default: ""
   },
   sites: {
      type: [String],
      default: [],
   },
   address: {
      type: String,
      required: true,
      unique: true
   }
})

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);