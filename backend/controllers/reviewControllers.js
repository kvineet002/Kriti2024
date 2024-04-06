const { Project } = require("../models/project");
const { Review } = require("../models/reviews");
const { User } = require("../models/user");
const { emailService } = require("../services/emailService");

const createReview = async (req, res) => {
  try {
    const { userId, message, projectId } = req.body;
    const user = await User.findById(userId);
    const Name = user.Name;
    const profileUrl = user.profileUrl;
    const newReview = new Review({
      Name,
      profileUrl,
      message,
      projectId,
    });
    const project = await Project.findById(projectId);
    const projectCreator = project.creator[0];
    const savedReview = await newReview.save();

    res.status(201).json(savedReview);
    if (userId != project.creator[0].id) {

      // await emailService.sendCommentNotification(projectCreator, user);
      
    }
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getReviews = async (req, res) => {
  try {
    const { projectId } = req.params;

    const reviews = await Review.find({ projectId });

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error getting reviews:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { createReview, getReviews, deleteReview };
