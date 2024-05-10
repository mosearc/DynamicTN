const mongoose = require('mongoose');
const Post = require("../models/post");


exports.posts_get_all = (req, res, next) => {

    Post.find()
        .select('name text _id postImage')
        .exec()
        .then(docs => {
            const risp = {
                count: docs.length,
                posts: docs.map(doc => {
                    return {
                        name: doc.name,
                        text: doc.text,
                        postImage: doc.postImage,
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
}

exports.posts_create = (req, res, next) => {
    console.log(req.file)

    let post
    if(req.file === undefined){
        post = new Post({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            text: req.body.text,
            //postImage: req.file.path
        });
    }else{
        post = new Post({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            text: req.body.text,
            postImage: req.file.path
        });
    }


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
                        type: "GET",
                        url: "http://localhost:3000/posts/" + result._id
                    }
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
}

exports.posts_get_by_id = (req, res,next) => {
    const id = req.params.postId;

    Post.findById(id)
        .select('name text _id postImage')
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
}

//array propName:quello che vuoi cambiare: { "propName":"text", "value": 999 } "value":"yeye"
exports.posts_modify = (req, res, next) => {
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
                message: 'Post Updated Successfully',
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

exports.posts_delete = (req, res, next) => {
    const id = req.params.postId
    Post.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(204).json({
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
}