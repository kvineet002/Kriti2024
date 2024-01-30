const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  token: { type: String },
  followers: [
    {
      name: { type: String },
      profilePicture: { type: String },
    }
  ],
  following: [
    {
      name: { type: String },
      profilePicture: { type: String },
    }
  ],
  yourProjects: [
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
