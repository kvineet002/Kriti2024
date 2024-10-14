const mongoose = require("mongoose");

const sparkSchema = new mongoose.Schema({
  question: { type: String },
  answer: { type: String },
});

const Sparkplug = mongoose.model("Sparkplug", sparkSchema);

module.exports = {
    Sparkplug
    };
