const CURRENT = require('moment')().format('MM-DD');

module.exports = exports = (Map) => {

    for(let k of Map.keys()) {
        if(k === 'bot') continue;

        let MENTIONED = Map.get(k).mentioned;

        MENTIONED.forEach((value, key) => {
            let objTime = value
                .split('-')
                .map(val => parseInt(val));

            let currentTime = CURRENT
                .split('-')
                .map(val => parseInt(val));

            //checking if obj didn't stay for to long in Map obj
            if (objTime[0] === currentTime[0] && currentTime[1] - objTime[1] > 0) MENTIONED.delete(key);
            if (objTime[0] !== currentTime[0]) MENTIONED.delete(key);

        })
    }

    return Map

};