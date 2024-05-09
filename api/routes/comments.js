const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Comment = require('../models/comment');
const Post = require('../models/post');

//da testare tutte le api

router.get('/',  (req, res, next) => {
    Comment.find()
        .select('post text _id')
        .populate('post', 'name') //cosi la risposta continene il posto collegato e solo il suo nome
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
        .populate('post') //cosi la risposta continene il posto collegato
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


//array propName:quello che vuoi cambiare: { "propName":"like", "value": 999 }

router.patch("/:commentId", (req, res, next) => {
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
})


router.delete("/:commentId", (req, res, next) => {
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
})

module.exports = router;