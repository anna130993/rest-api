const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
    number: {type: Number, required: true},
});

module.exports = mongoose.model('Day', daySchema);