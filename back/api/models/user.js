const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    email: { type: String, unique: true, required: true, match: /^\S+@\S+\.\S+$/ },
    password: { type: String, required: true },
    //quantity: { type: Number, default: 1 }
    //price: { type: Number, require: true } //deve essere un numero ed è necessario
    role: { type: String, default: 'user' },
})

module.exports = mongoose.model('User', userSchema);
