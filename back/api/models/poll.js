const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    question: { type: String, required: true },
    answers: [
        {
            answer: { type: String, required: true },
            votes: { type: Number, default: 0 }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Poll', pollSchema);
