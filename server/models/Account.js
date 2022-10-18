const mongoose = require('mongoose')

const AccountSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Account', AccountSchema);