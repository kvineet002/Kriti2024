const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Id:{ type: String, required: true },
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  token:{type: String}

});

 const User = mongoose.model("User", userSchema);
 module.exports = {
  User
};

