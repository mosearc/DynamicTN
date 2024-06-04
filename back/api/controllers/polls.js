const mongoose = require('mongoose');
const Poll = require('../models/poll');

exports.polls_get_all = (req, res, next) => {
    Poll.find()
    .select('question answers _id createdAt')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            polls: docs.map(doc => ({
                question: doc.question,
                answers: doc.answers,
                _id: doc._id,
                createdAt: doc.createdAt,
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/polls/${doc._id}`
                }
            }))
        };
        res.status(docs.length > 0 ? 200 : 400).json(docs.length > 0 ? response : { message: 'No Polls Found!' });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: err });
    });
};

exports.polls_get_by_id = (req, res, next) => {
    const id = req.params.pollId;

    Poll.findById(id)
    .select('question answers _id createdAt')
    .exec()
    .then(doc => {
        if (doc) {
            res.status(200).json({
                poll: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/polls'
                }
            });
        } else {
            res.status(404).json({ message: 'Poll Not Found' });
        }
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: err });
    });
};

exports.polls_create = (req, res, next) => {
    const answers = req.body.answers.map(answer => ({ answer: answer.answer }));

    const poll = new Poll({
        _id: new mongoose.Types.ObjectId(),
        question: req.body.question,
        answers: answers
    });

    poll.save()
    .then(result => {
        res.status(201).json({
            message: 'Poll Created Successfully',
            createdPoll: {
                question: result.question,
                answers: result.answers,
                _id: result._id,
                createdAt: result.createdAt,
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/polls/${result._id}`
                }
            }
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({  error: err });
    });
};

exports.polls_update = (req, res, next) => {
    const id = req.params.pollId;
    const updateAns = {};

    for (const ans of req.body) {
        updateAns[ans.propName] = ans.value;
    }

    Poll.updateOne({ _id: id }, { $set: updateAns })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Poll Updated Successfully',
            request: {
                type: 'GET',
                url: `http://localhost:3000/polls/${id}`
            }
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: err });
    });
};

exports.polls_delete = (req, res, next) => {
    const id = req.params.pollId;
    
    Poll.deleteOne({ _id: id })
    .exec()
    .then(result => {
        res.status(204).json({
            message: 'Poll Deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/polls',
                data: { question: 'String', options: 'Array' }
            }
        });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: err });
    });
};
