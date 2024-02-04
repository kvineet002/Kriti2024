const express = require("express");
const { createReview, getReviews } = require("../controllers/reviewControllers");
const router = express.Router();


router.post('/create-review', createReview);
router.get('/get-reviews/:projectId', getReviews);
module.exports = router;
