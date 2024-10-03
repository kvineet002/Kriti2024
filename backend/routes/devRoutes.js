const express = require("express");
const { sendEmail } = require("../controllers/emailController");
const router = express.Router();


router.post('/sendemail', sendEmail);
module.exports = router;
