const path = require("path");
const { User } = require("../models/user");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name:'djzzrbrny',
  api_key: '483651354228974',
  api_secret: 'eVaGealW3wFUYaNBqgMrMAsmt0E',
});


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

const addFollower = async (req, res) => {
  try {
    const {usertofollowId,yourId,name } = req.body; 

    const user = await User.findById(usertofollowId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    // Create a new follower object
    const newFollower = { yourId,name };

    // Update the user with the new follower
    const updatedUser = await User.findByIdAndUpdate(
      usertofollowId,
      { $push: { followers: newFollower } },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const unfollowUser = async (req, res) => {
  try {
    const { usertounfollowId,yourUserId } = req.body; // Assuming unfollowUserId is sent in the request body

    // Validate if both users exist
    const user = await User.findById(usertounfollowId);
    const unfollowedUser = await User.findById(yourUserId);

    if (!user || !unfollowedUser) {
      return res.status(404).json({ error: 'User(s) not found' });
    }

    // Remove the unfollowed user from the followers list
    const updatedUser = await User.findByIdAndUpdate(
      usertounfollowId,
      { $pull: { followers: { name: unfollowedUser.Name } } },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const profilePictureUpload=async (req, res) => {
  try {
    const { imageData } = req.body; // Assuming imageData is a base64 encoded image

    // Upload image to Cloudinary
    const cloudinaryUploadResult = await cloudinary.uploader.upload(imageData);

    // Now you can save cloudinaryUploadResult.url to your database or perform any other necessary actions.
    res.json({ cloudinaryURL: cloudinaryUploadResult.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports = {createUser,addFollower,unfollowUser,profilePictureUpload};
