const express = require("express");
const Post = require("../models/content-model.js");
const router = express.Router();
const { getPost } = require("../controllers/content-controller.js");

router.get('/', getPost);

module.exports = router;
