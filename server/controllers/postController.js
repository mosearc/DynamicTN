const Post = require("../models/Post");
const User = require("../models/User");

exports.posts_create_post = (req, res, next) => {
    const post = new post({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    post
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created post successfully",
                createdPost: {
                    title: result.title,
                    _id: result._id,
                    text: result.text,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/posts/" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};



