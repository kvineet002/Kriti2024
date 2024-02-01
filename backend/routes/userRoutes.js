const express = require("express");
const router = express.Router();
const { createUser, getAllUsers, getFollowingList, toggleFollowandfollowing} = require('../controllers/userController');


router.post('/', createUser);
router.post('/togglefollow',toggleFollowandfollowing);
router.get('/allusers',getAllUsers);
router.post('/getfollowing',getFollowingList);
module.exports = router;
