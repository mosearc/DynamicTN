const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Post = require('../models/post');

// GET to /orders
router.get('/', (req, res, next) => {

    Post.find()
        .select('name text _id')
        .exec()
        .then(docs => {
            const risp = {
                count: docs.length,
                posts: docs.map(doc => {
                    return {
                        name: doc.name,
                        text: doc.text,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/posts/" + doc._id
                        }
                    }
                })
            }
            if (docs.length > 0) {
                res.status(200).json(risp);
            }else{
                res.status(404).json({message:'No Posts Found'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
})

router.post('/', (req, res, next) => {

    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        text: req.body.text,
    });

    post
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created Successfully',
                createdPost: {
                    name: result.name,
                    text: result.text,
                    _id: result._id,
                    result: {
                        type:"GET",
                        url: "http://localhost:3000/posts/" + result._id
                    }
                }
    })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });


    })
})

router.get('/:postId', (req, res,next) => {
    const id = req.params.postId;

    Post.findById(id)
        .select('name text _id')
        .exec()
        .then(doc => {
            console.log("from database ", doc);
            if(doc){
                res.status(200).json({
                    post: doc,
                    request: {
                        type: "GET",
                        description: 'get a specific product',
                        url: "http://localhost:3000/",
                    }
                })
            }else{
                res.status(404).json({message: 'Not Found'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})


//array propName:quello che vuoi cambiare
router.patch('/:postId', (req, res, next) => {
    const id = req.params.postId
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Post.updateOne({_id: id}, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Updated Successfully',
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

router.delete('/:postId', (req, res, next) => {
    const id = req.params.postId
    Post.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'DELETED',
                request: { //roba per fare l'inverso e avere info
                    type: 'POST',
                    url: 'http://localhost:3000/posts',
                    data: {name: 'String', text: 'String'}
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})

module.exports = router