const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  token: { type: String },
  designation: { type: String },
  profileUrl: { type: String,default:"/profile-icon.jpg" },
  followers: [
    {
      _id:{type:String},
      Name: { type: String },
      profilePicture: { type: String, },
  designation: { type: String },
      
    }
  ],
  following: [
    {_id:{type:String},
      Name: { type: String },
      profilePicture: { type: String },
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
