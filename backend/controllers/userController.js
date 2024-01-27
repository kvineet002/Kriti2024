const path = require("path");
const multer = require("multer");
const { User } = require("../models/user");


async function createUser(req, res) {
  const { Email,Name,token,Id } = req.body;
  try {
    let user = await User.findOne({ Id });

    if (!user) {
      user = new User({ Email, Name, token, Id });
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

module.exports = {createUser};
