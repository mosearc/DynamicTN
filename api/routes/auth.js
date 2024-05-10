const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {hash} = require("bcrypt");

const AuthController = require("../controllers/auth");

//login
router.post('/', AuthController.auth_login)


module.exports = router;