const MONGOOSE = require('mongoose')
const CONFIG = require('./config.json')

const URL = `mongodb://${CONFIG.mongoose.username}:${CONFIG.mongoose.password}@ds159254.mlab.com:59254/spiderpreme_bot`;

module.exports = MONGOOSE.connect(URL, (err) => {
    if(err) console.log(err)
    else console.log('<<<Connected to mongoose')
} )
