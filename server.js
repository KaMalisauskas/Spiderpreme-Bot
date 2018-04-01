const CONFIG = require('./config.json');
const SCRAPER = require('./scraper');

(async (email, password, url) => {

    const CREDS = {
        email,
        password,
    }
    const SELECTORS = {
        email: '#email',
        submit: '#loginbutton',
        mainUrl: 'https://fb.com/',
        scrapingUrl: url,
        loopingTime: 1
    }

    try {

        let count = 0

        // while(count < SELECTORS.loopingTime) {
            count++
            await SCRAPER.main(SELECTORS, CREDS)
        // }


    } catch (err) {
        console.error(err)
    }


})(CONFIG.main.email, CONFIG.main.password, CONFIG.main.url)

