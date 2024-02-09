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
  module.exports={createReview,getReviews};