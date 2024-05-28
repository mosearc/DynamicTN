const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const PollController = require('../controllers/polls');

router.get('/', PollController.polls_get_all);

router.get('/:pollId', PollController.polls_get_by_id);

router.post('/', PollController.polls_create);

router.patch('/:pollId', PollController.polls_update);

router.delete('/:pollId', PollController.polls_delete);

module.exports = router;
