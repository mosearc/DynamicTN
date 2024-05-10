const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const {hash} = require("bcrypt");
const Post = require("../models/post");


router.post('/', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'User already exists'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                        })
                        user
                            .save()
                            .then(result => {
                                console.log(result)
                                res.status(201).json({
                                    message: 'User saved successfully.',
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })
})

router.delete('/:userId', (req, res, next) => {
    User.deleteOne({_id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'DELETED user',
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.get('/', (req, res, next) => {
    User.find()
        .select('email password _id')
        .exec()
        .then(docs => {
            const risp = {
                count: docs.length,
                posts: docs.map(doc => {
                    return {
                        email: doc.email,
                        password: doc.password,
                        _id: doc._id,

                        request: {
                            type: "GET",
                            url: "http://localhost:3000/users/" + doc._id
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

router.get('/:email', (req, res, next) => {
    const { email } = req.params;
    User.findOne({ email })
        .select('email password _id')
        .exec()
        .then(doc => {
            console.log("from database ", doc);
            if(doc){
                res.status(200).json({
                    post: doc,
                    request: {
                        type: "GET",
                        description: 'get a specific user',
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



module.exports = router;