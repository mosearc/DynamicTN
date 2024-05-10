const Post = require("../models/content-model.js");

const getPost = async (req, res) => {
    try {
        const post = await Post.find({});
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getPost
};
