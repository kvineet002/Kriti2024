const { Project } = require("../models/project");
const { User } = require("../models/user");

async function createUser(req, res) {
  const { Email,Name,token } = req.body;
  try {
    let user = await User.findOne({ Email });

    if (!user) {
      user = new User({ Email, Name, token });
      await user.save();
      console.log("User Created Successfully");
      res.status(200).json({ message: "User created successfully", user });
    } else {
      console.log("User Found");
      res.status(200).json({ message: "User found", user });
    }
  } catch (error) {
    console.error("Error in findOrCreateUser:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}
const toggleFollowandfollowing = async (req, res) => {
  try {
    const { userId, targetUserId,Name,designation} = req.body;
    // Fetch the user and the target user
    const user = await User.findById(userId);
    const targetUser = await User.findById(targetUserId);
    if (!user || !targetUser) {
      return res.status(404).json({ error: 'User or target user not found' });
    }

    // Check if the user is already following the target user
    const isFollowing = user.following.some((following) => following._id === targetUserId);

    if (isFollowing) {
      // If already following, unfollow the target user
      await User.findByIdAndUpdate(
        userId,
        { $pull: { following: { _id:targetUserId } } },
        { new: true }
      );

      // Also, remove the user from the target user's followers list
      await User.findByIdAndUpdate(
        targetUserId,
        { $pull: { followers: { _id:userId } } },
        { new: true }
      );

      res.status(200).json({ message: 'Unfollowed', isFollowing: false });
    } else {
      const newFollowing = {_id: targetUserId,Name:Name,designation:designation};

      await User.findByIdAndUpdate(
        userId,
        { $push: { following: newFollowing } },
        { new: true }
      );

    
      const newFollower = { _id:userId,Name:Name,designation:designation };

      await User.findByIdAndUpdate(
        targetUserId,
        { $push: { followers: newFollower } },
        { new: true }
      );

      res.status(200).json({ message: 'Followed',isFollowing: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getFollowingList = async (req, res) => {
  try {
    const {userId} = req.body; 

    // Fetch the user document
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Get the list of following users
    const followingList = user.following;

    res.status(200).json(followingList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getFollowersList = async (req, res) => {
  try {
    const {userId} = req.body; 

    // Fetch the user document
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Get the list of following users
    const followersList = user.followers;

    res.status(200).json(followersList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {createUser,getAllUsers,getFollowingList,toggleFollowandfollowing,getFollowersList};
