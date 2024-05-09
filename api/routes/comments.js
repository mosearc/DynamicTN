const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Comment = require('../models/comment');
const Post = require('../models/post');


router.get('/',  (req, res, next) => {
    Comment.find()
        .select('post text _id')
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
})

router.post('/',  (req, res, next) => {
    Post.findById(req.body.postId)
        .then(post => {
            if (!post){
                return res.status(404).json({
                    message: 'Post not found'
                })
            }
            const comment = new Comment({
                _id: new mongoose.Types.ObjectId(),
                text: req.body.text,
                post: req.body.postId
            })
            return comment.save()
        })
        .then( result => {
            console.log(result);
            res.status(201).json({
                message: "Comment successfull",
                createdComment: {
                    _id: result._id,
                    post: result.post,
                    text: result.text,
                },
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/comments/" + result._id
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        });

})


router.get("/:commentId", (req, res, next) => {
    Comment.findById(req.params.commentId)
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
})

router.delete("/:commentId", (req, res, next) => {
    Comment.deleteOne({_id: req.params.commentId})
        .exec()
        .then(result => {
            res.status(200).json({
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
})

router.patch("/:commentId", (req, res, next) => {

})

module.exports = router;