require('./connect')
const CONFIG = require('./config.json');
const SCRAPER = require('./Modules/scraper');
const CLEANER = require('./Modules/mapCleaner');
const NOTIFY = require('./Modules/emailNotification');

(async (url, keyword) => {


    let map = new Map()

    try {

        while(true) {
            let newMap = await SCRAPER(map)
            map = await CLEANER(newMap)
        }


    } catch (err) {
        console.error(err);
        await NOTIFY.error(err)
    }


})(CONFIG.main.url, CONFIG.main.keyword)

