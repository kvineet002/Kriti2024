const { Review } = require("../models/reviews");

const createReview= async (req, res) => {
    try {
      const { Name, profileUrl, message, projectId } = req.body;
  
      const newReview = new Review({
        Name,
        profileUrl,
        message,
        projectId,
      });
  
      const savedReview = await newReview.save();
  
      res.status(201).json(savedReview);
    } catch (error) {
      console.error('Error creating review:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
 const getReviews= async (req, res) => {
    try {
      const { projectId } = req.params;
  
      const reviews = await Review.find({ projectId });
  
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Error getting reviews:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  const deleteReview = async (req, res) => {
    try {
      const { reviewId } = req.params;
  
      const deletedReview = await Review.findByIdAndDelete(reviewId);
  
      if (!deletedReview) {
        return res.status(404).json({ error: 'Review not found' });
      }
  
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  module.exports={createReview,getReviews,deleteReview};