const SCRAPER = require('./scraper');
const axios = require('axios')
module.exports = exports = (map) => {

    return new Promise( async (resolve, reject) => {

        try {
            let req = await axios.get('https://spiderpremeclient.herokuapp.com/getAllRequests');
            if(req.error) reject(req.error)

            let requests = req.data.data

            if (!map) {
                let map = new Map();
                map.set('bot', []);
                requests.forEach((request) => {
                    let obj = {
                        keyword: request.keyword,
                        url: request.url,
                        email: request.email,
                        index: map.get('bot').length,
                        mentioned: new Map()
                    };
                    map.set(obj.email, obj)
                    map.get('bot').push(SCRAPER(map, obj.email))
                })
                resolve(map)

            } else {

                let array = []
                map.set('bot', [])

                requests.forEach((req) => {

                    array.push(req.email)
                    if (map.has(req.email)) {

                        if (map.get(req.email).url !== req.url) map.get(req.email).url = req.url;
                        if (map.get(req.email).keyword !== req.keyword) map.get(req.email).keyword = req.keyword;
                        map.get('bot').push(SCRAPER(map, req.email))

                    } else {

                        let obj = {
                            keyword: req.keyword,
                            url: req.url,
                            email: req.email,
                            index: map.get('bot').length,
                            mentioned: new Map()
                        }
                        map.set(obj.email, obj)
                        map.get('bot').push(SCRAPER(map, obj.email))

                    }

                });
                /*
                    @TODO Needs some work and testing!
                 */
                map.forEach((val, key) => {
                    if (key !== 'bot' && !array.includes(val.email)) {
                        console.log('delete');
                        map.get('bot').splice(val.index, 1);
                        map.delete(key);
                    }
                })
                resolve(map)
            }
        } catch(err) {
            reject(err)
        }
    })
}
