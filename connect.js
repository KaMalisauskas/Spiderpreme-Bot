const MONGOOSE = require('mongoose')
const CONFIG = require('./config.json')

const URL = `mongodb://${CONFIG.mongoose.username}:${CONFIG.mongoose.password}@ds229909.mlab.com:29909/spiderpreme`;

module.exports = MONGOOSE.connect(URL, (err) => {
        if(err) console.log(err)
        else console.log('<<<Connected to mongoose')
    } )

