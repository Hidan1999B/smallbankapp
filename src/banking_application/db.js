const mongoose = require('mongoose');

let connection;


const getConnection = async () => {
    if (!connection) {
        connection = await mongoose.connect('mongodb://localhost/Exam', {
            useNewUrlParser: true,
            useCreateIndex: true,
        });
    }
    return connection;
}

module.exports = {
    getConnection: getConnection
}