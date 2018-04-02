const CONFIG = require('./config.json');
const SCRAPER = require('./Modules/scraper');
const CLEANER = require('./Modules/mapCleaner');
const NOTIFY = require('./Modules/emailNotification');

(async (email, password, url, keyword) => {

    const CREDS = {
        email,
        password,
    }
    const SELECTORS = {
        keyword,
        email: '#email',
        submit: '#loginbutton',
        mainUrl: 'https://fb.com/',
        scrapingUrl: url,
        loopingTime: 3
    }
    let count = 0
    let map = new Map()

    try {

        while(true) {
            count++
            let newMap = await SCRAPER(SELECTORS, CREDS, map)
            map = await CLEANER(newMap)
        }


    } catch (err) {
        console.error(err);
        await NOTIFY.error(err, SELECTORS.keyword)
    }


})(CONFIG.main.email, CONFIG.main.password, CONFIG.main.url, CONFIG.main.keyword)

