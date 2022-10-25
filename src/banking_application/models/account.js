const mongoose = require('mongoose');

// 3. Finish the account schema
const AccountSchema = new mongoose.Schema({
    client_id: {
        type: String,
        required: true,
    },
    alias: {
        type: String,
        required: true
    }, 
    balance: {
        type: Number,
        required: true
    }
});

const model = mongoose.model('Account', AccountSchema);

module.exports = model;