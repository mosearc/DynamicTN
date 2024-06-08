const mongoose = require('mongoose');
const User = require("../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

exports.users_signin = async (req, res, next) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.email",
        port: 587,
        secure: false,
        auth: {
            user: "dynamictn9@gmail.com",
            pass: process.env.MAIL_PASSW,
        },
    });

    let mailOptions = {
        from: {
            name: 'DynamicTN',
            address: 'dynamictn9@gmail.com',
        },
        to: ["mose.arcaro@gmail.com"],
        subject: "Welcome in DynamicTN! ✔",
        text: "Hello World?",
    };

    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hashedPassword,
        });

        await newUser.save();

        mailOptions.to = [req.body.email];
        mailOptions.text = `HI! Here are your credentials! \nYour Mail: ${req.body.email}, \nYour Password: ${req.body.password}`;
        await transporter.sendMail(mailOptions);
        console.log("Email sent!");

        return res.status(201).json({
            message: 'User saved successfully. A mail was sent to you',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message
        });
    }
};

exports.users_delete = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({ message: 'DELETED user' });
    } catch (error) {
        console.log('Delete error:', error);
        res.status(500).json({ error: 'Delete error' });
    }
};

exports.users_get_all = async (req, res) => {
    try {
        const users = await User.find().select('name email').exec();
        if (users.length === 0) {
            return res.status(404).json({ message: 'No Users Found' });
        }
        res.status(200).json({ count: users.length, users });
    } catch (error) {
        console.log('Get all users error:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.users_get_by_email = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email }).select('name email').exec();
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log('Get user by email error:', error);
        res.status(500).json({ error: error.message });
    }
};
