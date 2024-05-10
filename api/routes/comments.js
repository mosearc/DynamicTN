const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');


const Comment = require('../models/comment');
const Post = require('../models/post');

const CommentController = require('../controllers/comments');

router.get('/', CommentController.comments_get_all )

router.post('/', checkAuth, CommentController.comments_create)

router.get("/:commentId", CommentController.comments_get_by_id)

router.patch("/:commentId", checkAuth, CommentController.comments_modify)

router.delete("/:commentId", checkAuth, CommentController.comments_delete)

module.exports = router;