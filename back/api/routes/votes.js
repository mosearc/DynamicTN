const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const Vote = require('../models/vote')

const VotesController = require('../controllers/votes');

/**
 * @swagger
 * /votes:
 *   post:
 *     summary: save an upvote put by an user 
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/votes'
 *     responses:
 *       201:
 *         description: The upvote was successfully saved 
 *       500:
 *         description: Some server error
 *       409:
 *         description: vote already exists 
 *       404:
 *         poll not found
 */

router.post("/polls/sendVote/:pollId",checkAuth,VotesController.save_option_vote)



/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: API endpoint to manage likes 
 */

/**
 * @swagger
 * /votes:
 *   get:
 *     summary: Returns the total amounts of upvotes under a post 
 *     tags: [Comment]
 *     responses:
 *       200:
 *         description: number of likes of a post 
 *         content:
 *           application/json:
 *             schema:
 *               type: number 
 *               items:
 *                 nrLikes 
 *       500:
 *         description: fatal error
 */

router.get("/posts/:postId",VotesController.get_votes_post)

/**
 * @swagger
 * /votes:
 *   post:
 *     summary: save an upvote put by an user 
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/votes'
 *     responses:
 *       201:
 *         description: The upvote was successfully saved 
 *       500:
 *         description: Some server error
 *       409:
 *         description: vote already exists 
 *       404:
 *         post not found
 */

router.post("/posts/sendVote/:postId",checkAuth,VotesController.save_upvote)

module.exports = router
