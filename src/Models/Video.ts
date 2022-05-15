import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name:String,
  url:String,
  thumbnailUrl:String,
  isPrivate:Boolean,
  timesViewed:Number
});

module.exports = mongoose.model("Videos", userSchema);