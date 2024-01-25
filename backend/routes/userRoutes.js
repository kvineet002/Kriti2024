const express = require("express");
const router = express.Router();
const { createUser, handleFileUpload, upload } = require('../controllers/userController');


router.post('/', createUser);
router.post('/upload', upload.single('file'), handleFileUpload);
module.exports = router;
