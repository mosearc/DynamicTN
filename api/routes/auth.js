const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {hash} = require("bcrypt");


//login
router.post('', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'auth failed'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'auth failed'
                    })
                }
                if ( result ){
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                        "secret" /*process.env.JWT_KEY*/,
                        {
                            expiresIn: "1h"
                        },
                        )
                    return  res.status(200).json({
                        message: 'auth success',
                        token: token
                    })
                }
                return res.status(401).json({
                    message: 'auth failed'
                })
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send({
                error: err
            })
        })
})






module.exports = router;