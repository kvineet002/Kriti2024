const { Project } = require("../models/project");
const { User } = require("../models/user");
const { emailService } = require("../services/emailService");


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
    const user=await User.findOne({_id:creator.id});
    user.lastposttime=Date.now();
    await user.save();
    const savedProject = await newProject.save();
    
    res.status(201).json(savedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const updateProject = async (req, res) => {
  try {
    const {
      projectId,
      title,
      description,
      category,
      bannerUrl,
      status,
      bigdescription,
      statusMessage,
      technologies,
      courseLinks,
      projectLinks,
    } = req.body;

    // Find the project by ID
    const existingProject = await Project.findById(projectId);

    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Update the project fields
    existingProject.title = title;
    existingProject.description = description;
    existingProject.category = category;
    existingProject.bannerUrl = bannerUrl;
    existingProject.status = status;
    existingProject.bigdescription = bigdescription;
    existingProject.statusMessage = statusMessage;
    existingProject.technologies = technologies;
    existingProject.courseLinks = courseLinks;
    existingProject.projectLinks = projectLinks;

    // Save the updated project
    const updatedProject = await existingProject.save();

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const deleteProject=async (req, res) => {
  const { projectId } = req.body;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    await Project.findByIdAndDelete(projectId);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
const likeorunlikeProject = async (req, res) => {
    try {
      const { projectId, userId } = req.body;
      let sendMail=false;
      const project = await Project.findById(projectId);
      const user=await User.findById(userId); 
  
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
        if(project.creator[0].id!==userId){
          sendMail=true;
        }
      }
      
      await project.save();
      
      res.status(200).json(project);
      // if(sendMail)await emailService.sendLikeNotification(project.creator[0],user);
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
  createProject,likeorunlikeProject,getProject,getAllProjects,saveorunsaveProject,deleteProject,updateProject
};
