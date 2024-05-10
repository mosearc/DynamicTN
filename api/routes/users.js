const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const {hash} = require("bcrypt");
const Post = require("../models/post");
const checkAuth = require('../middleware/check-auth');


const UserController = require("../controllers/users");



router.post('/', UserController.users_signin )

router.delete('/:userId', checkAuth, UserController.users_delete)

router.get('/', UserController.users_get_all)

router.get('/:email', UserController.users_get_by_email)



module.exports = router;