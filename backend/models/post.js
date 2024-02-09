const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  bannerUrl: {
    type: String,
  },
  creator: [
    {
      id: { type: String },
      Name: { type: String },
      email: { type: String },
      designation: { type: String },
      profileUrl:{type:String,default:"/profile-icon.jpg"},
    },
  ],
  likes: [
    {
      id: { type: String },
      link: { type: String },
    },
  ],
});

const Post= mongoose.model("Post", postSchema);

module.exports = {
  Post,
};
