const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const PollController = require('../controllers/polls');

/**
 * @swagger
 * tags:
 *   name: Poll
 *   description: API endpoint to manage polls
 */

/**
 * @swagger
 * /polls:
 *   get:
 *     summary: Returns the list of all the polls
 *     tags: [Poll]
 *     responses:
 *       200:
 *         description: The list of the polls
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Poll'
 *       404:
 *         description: Seems empty :(
 *       500:
 *         description: Fatal error
 */
router.get('/', PollController.polls_get_all);

/**
 * @swagger
 * /polls/{pollId}:
 *   get:
 *     summary: Get the poll by id
 *     tags: [Poll]
 *     parameters:
 *       - in: path
 *         name: pollId
 *         schema:
 *           type: string
 *         required: true
 *         description: The poll id
 *     responses:
 *       200:
 *         description: The poll with that id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poll'
 *       404:
 *         description: Not found
 *       500:
 *         description: Fatal error
 */
router.get('/:pollId', PollController.polls_get_by_id);

/**
 * @swagger
 * /polls:
 *   post:
 *     summary: Create a new poll
 *     tags: [Poll]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Poll'
 *     responses:
 *       201:
 *         description: The poll was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Poll'
 *       500:
 *         description: Some server error
 */
router.post('/', PollController.polls_create);


/**
 * @swagger
 * /polls/{pollId}:
 *  patch:
 *    summary: Update the poll by id
 *    tags: [Poll]
 *    parameters:
 *      - in: path
 *        name: pollId
 *        schema:
 *          type: string
 *        required: true
 *        description: The poll id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Poll'
 *    responses:
 *      200:
 *        description: The poll was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Poll'
 *      500:
 *        description: Some error happened
 */
router.patch('/:pollId', PollController.polls_update);

/**
 * @swagger
 * /polls/{pollId}:
 *   delete:
 *     summary: Remove the poll by id
 *     tags: [Poll]
 *     parameters:
 *       - in: path
 *         name: pollId
 *         schema:
 *           type: string
 *         required: true
 *         description: The poll id
 *     responses:
 *       204:
 *         description: The poll was deleted
 *       500:
 *         description: Fatal error
 */
router.delete('/:pollId', PollController.polls_delete);

router.post('/:pollId/vote', PollController.polls_vote);

module.exports = router;
