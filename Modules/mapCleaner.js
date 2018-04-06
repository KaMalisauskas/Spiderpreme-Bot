const MOMENT = require('moment');
const NOW = MOMENT();
const CURRENT = NOW.format('MM-DD');

module.exports = exports = async (map) => {

    map.forEach( val => {
        val.forEach((value, key) => {
            let objTime = value
                .split('-')
                .map(val => parseInt(val))

            let currentTime = CURRENT
                .split('-')
                .map(val => parseInt(val))

            //checking if obj didn't stay for to long in Map obj
            if (objTime[0] === currentTime[0] && currentTime[1] - objTime[1] > 0) val.get(key).delete()
            if (objTime[0] !== currentTime[0]) Map.delete(key)

        })

    })

    return map
}

