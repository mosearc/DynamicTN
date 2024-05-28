const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-role');



const Comment = require('../models/comment');
const Post = require('../models/post');

const CommentController = require('../controllers/comments');

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: API endpoint to manage comments
 */

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Returns the list of all the comments
 *     tags: [Comment]
 *     responses:
 *       200:
 *         description: The list of the comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       500:
 *         description: fatal error
 */
router.get('/', CommentController.comments_get_all )

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: The comment was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Some server error
 *       404:
 *         description: post not found
 */
router.post('/', checkAuth, CommentController.comments_create)

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: get the comment with the id
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: the comment id
 *     responses:
 *       200:
 *         description: the comment with that id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: comment not found
 *       500:
 *         description: fatal error
 */
router.get("/:commentId", CommentController.comments_get_by_id)

/**
 * @swagger
 * /comments/{id}:
 *  put:
 *    summary: Update the comment by the id
 *    tags: [Comment]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The comment id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Comment'
 *    responses:
 *      200:
 *        description: The comment was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Comment'
 *      500:
 *        description: Some error happened
 */
router.patch("/:commentId", checkAuth, checkAdmin,CommentController.comments_modify)

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Remove the comment by id
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *
 *     responses:
 *       204:
 *         description: The comment was deleted
 *       500:
 *         description: fatal error
 */
router.delete("/:commentId", checkAuth, checkAdmin,CommentController.comments_delete)

module.exports = router;