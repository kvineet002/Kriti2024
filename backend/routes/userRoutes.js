const express = require("express");
const router = express.Router();
const { createUser, addFollower, unfollowUser, profilePictureUpload} = require('../controllers/userController');


router.post('/', createUser);
router.post('/addfollower',addFollower);
router.post('/removefollower',unfollowUser);
router.post('/profileupload',profilePictureUpload);
module.exports = router;
