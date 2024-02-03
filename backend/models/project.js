const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  bigdescription: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  bannerUrl: {
    type: String,
  },
  extraMedia: {
    type: [String], // Assuming an array of media URLs
  },
  status: {
    type: String,
    enum: ["Open for Collabration", "Completed"],
    default: "Completed",
  },
  statusMessage: {
    type: String,
  },
  technologies:  [
    {
      Title: { type: String },
      color: { type: String ,default:"#FFF"},
    },
  ],
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
  saved: [
    {
      id: { type: String },
      link: { type: String },
    },
  ],
  courseLinks:[ {
    
        link: { type: String },
}],
  rating: {
    type: Number,
    default: 0,
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = {
  Project,
};
