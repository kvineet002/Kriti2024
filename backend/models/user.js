const mongoose = require("mongoose");
const { Notification } = require("../models/notification");
const userSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  About:{type:String},
  token: { type: String },
  designation: { type: String },
  joiningYear: {type:String},
  lastposttime: { type: Date },
  graduatingYear:{type:String},
  profileUrl: { type: String,default:"/profile-icon.jpg" },
  socials: {
    github: String,
    linkedin: String,
    instagram: String,
    facebook: String,
    twitter: String,
    youtube: String,
  },
  followers: [
    {
      _id:{type:String},
      Name: { type: String },
      profileUrl: { type: String, },
      designation: { type: String },
    }
  ],
  following: [
    {
      _id:{type:String},
      Name: { type: String },
      profileUrl: { type: String },
      designation: { type: String },
    }
  ],
  notifications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notification"}
  ],
  yourProjects: [
    {
      projectName: { type: String },
      projectDetails: { type: String },
    }
  ],
  savedProjects: [
    {
      projectName: { type: String },
      projectDetails: { type: String },
    }
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = {
  User
};
