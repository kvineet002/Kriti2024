const express = require("express");
const { createProject,getProject, likeorunlikeProject, getAllProjects, saveorunsaveProject, updateProject, deleteProject } = require("../controllers/projectControllers");
const router = express.Router();


router.post('/create', createProject);
router.post('/updateproject', updateProject);
router.post('/delete', deleteProject);
router.post('/likeorunlike-project', likeorunlikeProject);
router.post('/saveorunsave-project', saveorunsaveProject);
router.post('/getproject', getProject);
router.post('/allprojects', getAllProjects);
module.exports = router;
