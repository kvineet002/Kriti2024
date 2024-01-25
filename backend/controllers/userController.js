const path = require("path");
const multer = require("multer");
const { User } = require("../models/user");


async function createUser(req, res) {
  const { profileUrl } = req.body;

  try {
    const newUser = new User({
      profileUrl,
    });

    await newUser.save();

    console.log("User Created Successfully");
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

async function handleFileUpload(req, res) {
  try {
    const filePath = req.file.path;
    const serverURL =
      "http://localhost:3002/uploads/" + path.basename(filePath); // Assuming your uploads are in the 'uploads' folder
    res.json({ url: serverURL });
  } catch (error) {
    console.error("Error uploading file:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
async function Details(req, res) {
  try {
    const { id: id } = req.body;
    const user = await User.findOne({ id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("working");
    res.status(200).json({
      profileUrl: user.profileUrl,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
module.exports = {upload,Details,createUser,handleFileUpload
};
