const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const {hash} = require("bcrypt");
const Post = require("../models/post");
const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-role');

const UserController = require("../controllers/users");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API endpoint to manage users
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created and an email was sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *       409:
 *         description: conflict, the user already exists
 */
router.post('/', UserController.users_signin )

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       500:
 *         description: fatal error
 */
router.delete('/:userId', checkAuth, checkAdmin, UserController.users_delete)

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', UserController.users_get_all)


/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: get the user by the email
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: the user email
 *     responses:
 *       200:
 *         description: the user with that email
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: not found
 *       500:
 *         description: fatal error
 */
router.get('/:email', UserController.users_get_by_email)



module.exports = router;