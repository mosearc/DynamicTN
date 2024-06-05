const mongoose = require('mongoose')

const voteSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    post : { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: false},
	poll: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll', required: false},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}) 

module.exports = mongoose.model('Vote', voteSchema);
