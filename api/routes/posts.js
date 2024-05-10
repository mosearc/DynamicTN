const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const PostController = require('../controllers/posts');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    //reject
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    }else{
        cb(null, false)
    }
}


const upload = multer({

    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter : fileFilter
});


const Post = require('../models/post');


// GET to /orders
router.get('/', PostController.posts_get_all)

router.post('/', checkAuth, upload.single('postImage'), PostController.posts_create)

router.get('/:postId', PostController.posts_get_by_id)

router.patch('/:postId', checkAuth, PostController.posts_modify)

router.delete('/:postId', checkAuth, PostController.posts_delete)

module.exports = router