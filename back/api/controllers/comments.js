const Comment = require("../models/comment");
const Post = require("../models/post");
const mongoose = require("mongoose");

exports.comments_get_all = (req, res, next) => {
    Comment.find()
        .select('post text _id')
        .populate('post', 'name')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        post: doc.post,
                        text: doc.text,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/comments/" + doc._id
                        }
                    }
                })

            });
        })
        .catch(err => {
            res.status(500).json({error: err});
        })
}

exports.comments_create = (req, res, next) => {
    Post.findById(req.body.postId)
        .then(async post => {
            if (post === null || !('_id' in post)){
                return res.status(404).json({
                    message: 'Post not found'
                })
            }

            const comment = new Comment({
                _id: new mongoose.Types.ObjectId(),
                text: req.body.text,
                post: req.body.postId
            })
            
			let newComment = await comment.save()

			res.status(201).json({
                message: "Comment successfull",
                createdComment: {
					_id: comment._id,
                    post: comment.post,
                    text: comment.text
                },
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/comments/" + newComment._id
                }
            })

        })
		.catch(err => {
			console.error(err)
            res.status(500).json({error: err})
        });
}

exports.comments_get_by_PostId = (req,res,next) => {
	Comment.find({post:req.params.postId})
		.exec()
		.then(comments=> {
			if(!comments.length){
				return res.status(404).json({
					message:"no comments in this post"
				})
			}
			res.status(200).json({
				comments:comments
			})
		})
		.catch(err => {
			res.status(500).json({
				error:err
			})
		})
}

exports.comments_get_by_id = (req, res, next) => {
    Comment.findById(req.params.commentId)
        .populate('post')
        .exec()
        .then(comment => {
            if(!comment){
                return res.status(404).json({
                    message: 'Comment not found'
                })
            }
            res.status(200).json({
                comment: comment,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/comments',
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.comments_modify = (req, res, next) => {
    const id = req.params.commentId;
    const updateOPS = {}
    for (const ops of req.body) {
        updateOPS[ops.propName] = ops.value;
    }

    Comment.updateOne({_id: id}, {$set: updateOPS})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Comment Updated Successfully',
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/posts/" + id
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
}

exports.comments_delete = (req, res, next) => {
    Comment.deleteOne({_id: req.params.commentId})
        .exec()
        .then(result => {
            res.status(204).json({
                message: "Comment deletion successfull",
                request: {
                    type: 'POST',
                    url: "http://localhost:3000/comments/",
                    body: { commentId: 'ID', text: 'String'}
                }
            })
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
}
