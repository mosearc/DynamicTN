const mongoose = require('mongoose');
const User = require("../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");



exports.users_signin = (req, res, next) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.email",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "dynamictn9@gmail.com",
            //pass: "xekk qugc mpzm pkxh", //process.env.MAIL_PASSW
            pass: process.env.MAIL_PASSW,
        },
    });

    let mailOptions = {
        from: {
            name: 'DynamicTN',
            address: 'dynamictn9@gmail.com',
        }, // sender address
        to: ["mose.arcaro@gmail.com"],//"bar@example.com, baz@example.com", // list of receivers
        subject: "Welcome in DynamicTN! ✔", // Subject line
        text: "Hello world?", // plain text body
        //html: "<b>Hello world?</b>", // html body
    }


    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'User already exists'
                })
            } else {

                mailOptions.to = [req.body.email];
                mailOptions.text = "HI! Here are your credentials! \nYour Mail: " + req.body.email + ", \nYour Password: " + req.body.password

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



                                const sendMail = async (transporter, mailOptions) => {
                                    try {
                                        await transporter.sendMail(mailOptions)
                                        console.log("Email sent! ")
                                    } catch {
                                        console.error(error)
                                    }
                                }

                                sendMail(transporter, mailOptions)



                                console.log(result)
                                res.status(201).json({
                                    message: 'User saved successfully. A mail was sent to you',
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
}

exports.users_delete = (req, res, next) => {
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
}

exports.users_get_all = (req, res, next) => {
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

}

exports.users_get_by_email = (req, res, next) => {
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
}