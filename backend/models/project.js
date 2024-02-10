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
  },
  bannerUrl: {
    type: String,
  },
  extraMedia: {
    type: [String], // Assuming an array of media URLs
  },
  status: {
    type: String,
    enum: ["Ongoing", "Completed"],
    default: "Completed",
  },
  statusMessage: {
    type: String,
  },
  technologies:  {
    type: [String], // Assuming an array of media URLs
  },
  projectLinks:{
    github:{ type: String},
    demo:{ type: String},
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
  saved: [
    {
      id: { type: String },
      link: { type: String },
    },
  ],
  courseLinks:{
    type: [String], // Assuming an array of media URLs
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = {
  Project,
};
