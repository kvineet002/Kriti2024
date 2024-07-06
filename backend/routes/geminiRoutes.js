const express = require("express");
const { geminiResponse } = require("../controllers/geminiController");
const router = express.Router();


router.post('/gemini/chat', geminiResponse);
module.exports = router;
