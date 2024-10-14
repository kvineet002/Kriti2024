const express = require("express");
const router = express.Router();
const { getQuestions, createQuestion } = require("../controllers/sparkController");


router.get('/getallquestions', getQuestions);
router.post('/createquestion', createQuestion);
module.exports = router;
