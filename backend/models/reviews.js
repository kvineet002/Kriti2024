const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  Name: { type: String },
  profileUrl: { type: String },
  message: { type: String },
  time: { type: Date, default: Date.now },
  projectId: {type:String }, // Assuming 'Project' is the model for projects
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = {
  Review
};
