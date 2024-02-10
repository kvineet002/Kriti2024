const express = require("express");
const { createReview, getReviews, deleteReview } = require("../controllers/reviewControllers");
const router = express.Router();


router.post('/create-review', createReview);
router.get('/get-reviews/:projectId', getReviews);
router.post('/delete-review/:reviewId', deleteReview);
module.exports = router;
