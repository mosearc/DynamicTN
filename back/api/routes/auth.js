const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {hash} = require("bcrypt");

const AuthController = require("../controllers/auth");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API endpoint to manage login
 */

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: perform the user login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: Auth success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auth'
 *       500:
 *         description: Some server error
 *       401:
 *         description: auth failed
 */
router.post('/', AuthController.auth_login)


module.exports = router;