const mongoose = require('mongoose');

// 3. Finish the account schema
const clientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
    type: String,
    required: true
},
    streetAddress: {
        type: String,
        required: true
    }, 
    city: {
         type: String,
        required: true
    }
});

const model = mongoose.model('client', clientSchema);

module.exports = model;