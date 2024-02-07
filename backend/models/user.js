const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  About:{type:String},
  token: { type: String },
  designation: { type: String },
  joiningYear: {type:Number},
  graduatingYear:{type:Number},
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
    {_id:{type:String},
      Name: { type: String },
      profileUrl: { type: String },
  designation: { type: String },

    }
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
