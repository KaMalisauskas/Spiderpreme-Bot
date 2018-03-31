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
        loopingTime: 5
    }

    try {
        await SCRAPER.main(SELECTORS, CREDS)


        const RECURSIVE = async (recCounter) => {
            if(count < recCounter) {
                count++
                await SCRAPER.main(SELECTORS, CREDS)
                await RECURSIVE()
            }
        }

        await RECURSIVE(SELECTORS.loopingTime)


    } catch (err) {
        console.log(err)
    }


})(CONFIG.main.email, CONFIG.main.password, CONFIG.main.url)

