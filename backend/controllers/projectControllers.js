const { Project } = require("../models/project");


const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      bannerUrl,
      status,
      bigdescription,
      statusMessage,
      technologies,
      creator,
      courseLinks,
      projectLinks,
    } = req.body;

    const newProject = new Project({
      title,
      description,
      category,
      bannerUrl,
      bigdescription,
      status,
      statusMessage,
      technologies,
      creator,
      courseLinks,
      projectLinks
    });

    const savedProject = await newProject.save();
    
    res.status(201).json(savedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const likeorunlikeProject = async (req, res) => {
    try {
      const { projectId, userId } = req.body;
  
      const project = await Project.findById(projectId);
  
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      // Check if the user has already liked the project
      const alreadyLikedIndex = project.likes.findIndex((like) => like.id === userId);
  
      if (alreadyLikedIndex !== -1) {
        // User has already liked the project, remove the like
        project.likes.splice(alreadyLikedIndex, 1);
      } else {
        // Add the user to the likes array
        project.likes.push({ id: userId });
      }
  
      await project.save();
  
      res.status(200).json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const getAllProjects = async (req, res) => {
    try {
      const projects = await Project.find();
      res.status(200).json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const getProject = async (req, res) => {
    try {
        const { projectId } = req.body;
  
      const project = await Project.findById(projectId);
  
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      res.status(200).json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const saveorunsaveProject = async (req, res) => {
    try {
      const { projectId, userId } = req.body;
  
      const project = await Project.findById(projectId);
  
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
      // Check if the user has already saved the project
      const alreadySavedIndex = project.saved.findIndex((save) => save.id === userId);
  
      if (alreadySavedIndex !== -1) {
        // User has already saved the project, remove the save
        project.saved.splice(alreadySavedIndex, 1);
      } else {
        // Add the user to the saved array
        project.saved.push({ id: userId });
      }
  
      await project.save();
  
      res.status(200).json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
module.exports = {
  createProject,likeorunlikeProject,getProject,getAllProjects,saveorunsaveProject
};
