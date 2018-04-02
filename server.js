const CONFIG = require('./config.json');
const SCRAPER = require('./Modules/scraper');
const CLEANER = require('./Modules/mapCleaner');

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
        loopingTime: 2
    }
    let count = 0
    let map = new Map()

    try {

        while(count < SELECTORS.loopingTime) {

            count++
            let newMap = await SCRAPER(SELECTORS, CREDS, map)
            newMap = CLEANER(newMap)
            map = newMap
            console.log(map)

            break

        }


    } catch (err) {
        console.error(err)
    }


})(CONFIG.main.email, CONFIG.main.password, CONFIG.main.url, CONFIG.main.keyword)

