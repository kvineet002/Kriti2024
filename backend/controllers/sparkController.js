const { Sparkplug } = require("../models/sparkplug");

async function createQuestion(req, res) {
    const { question,answer } = req.body;
    try {
     const   ques = new Sparkplug({ question,answer });
        await ques.save();
        console.log("Question Saved Successfully");
        res.status(200).json({ message: "Question Saved Successfully", ques });
    
    } catch (error) {
      console.error("Error  in Saving :", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }

  async function getQuestions(req, res) {
    try {
      const questions = await Sparkplug.find();
      res.status(200).json(questions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  module.exports = {
    createQuestion,
    getQuestions
    };
