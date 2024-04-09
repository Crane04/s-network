const Post = require("../models/postsModel")
const User = require("../models/userModel");

exports.MakePost = async(req, res) => {
    try {
        const userId = req.user.id
        const { content } = req.body
    
        const newPost = new Post({ user : userId, content : content} )
        await newPost.save()

        return res.status(201).json({
            "message": "Post created successfully",
            "post": newPost
        })
    } catch (error) {
        console.log(error)
    }
}

exports.GetPosts = async (req, res) => {
  const { page } = req.query

    try {
      // Query all posts and populate the 'user' field with the user details
      const posts = await Post.find().populate('user', "-password");
      if(!page || page == 0){
        res.status(200).json(posts.slice(0, 20));
      }
      res.status(200).json(posts.slice(20*page));
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }