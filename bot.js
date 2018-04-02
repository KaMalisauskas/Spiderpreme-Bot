const CONFIG = require('./config.json');
const SCRAPER = require('./Modules/scraper');
const CLEANER = require('./Modules/mapCleaner');
const NOTIFY = require('./Modules/emailNotification');

(async (url, keyword) => {

    const SELECTORS = {
        keyword,
        email: '#email',
        submit: '#loginbutton',
        mainUrl: 'https://fb.com/',
        scrapingUrl: url,
    }
    let map = new Map()

    try {

        while(true) {
            let newMap = await SCRAPER(SELECTORS, map)
            map = await CLEANER(newMap)
        }


    } catch (err) {
        console.error(err);
        await NOTIFY.error(err, SELECTORS.keyword)
    }


})(CONFIG.main.url, CONFIG.main.keyword)

