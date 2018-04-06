const MONGOOSE = require('mongoose')


const REQUESTS = new MONGOOSE.Schema({
    username: {
        type: String,
        trim: true,
    },
    url: {
        type: String,
        trim: true
    },
    keyword: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = MONGOOSE.model('requests', REQUESTS)