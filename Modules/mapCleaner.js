const MOMENT = require('moment');
const NOW = MOMENT();
const CURRENT = NOW.format('MM-DD');

module.exports = exports = (Map) => {

     Map.forEach((value, key) => {
        let objTime = value
            .split('-')
            .map(val => parseInt(val))

        let currentTime = CURRENT
            .split('-')
            .map(val => parseInt(val))

        //checking if obj didn't stay for to long in Map obj
        if(objTime[0] === currentTime[0] && currentTime[1] - objTime[1] > 0) Map.delete(key)
        if(objTime[0] !== currentTime[0]) Map.delete(key)

    })

    return Map

}