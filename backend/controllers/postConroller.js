const { Post } = require("../models/post");


const createPost = async (req, res) => {
  try {
    const {
      title,
      bannerUrl,
      creator,
    } = req.body;

    const newPost = new Post({
      title,
      bannerUrl,
      creator,
    });

    const savedPost = await newPost.save();
    
    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const likeorunlikePost = async (req, res) => {
    try {
      const { postId, userId } = req.body;
  
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ error: 'post not found' });
      }
  
      // Check if the user has already liked the project
      const alreadyLikedIndex = post.likes.findIndex((like) => like.id === userId);
  
      if (alreadyLikedIndex !== -1) {
        // User has already liked the project, remove the like
        post.likes.splice(alreadyLikedIndex, 1);
      } else {
        // Add the user to the likes array
        post.likes.push({ id: userId });
      }
  
      await post.save();
  
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const getAllPosts = async (req, res) => {
    try {
      const post = await Post.find();
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
module.exports = {
    createPost,getAllPosts
};
