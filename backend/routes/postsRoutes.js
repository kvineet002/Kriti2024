const express = require("express");
const { createPost, getAllPosts } = require("../controllers/postConroller");
const router = express.Router();


router.post('/create', createPost);
router.post('/getposts', getAllPosts);
module.exports = router;
