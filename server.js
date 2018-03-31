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
        mainUrl: 'https://fb.com',
        scrapingUrl: url

    }

    try {

        await SCRAPER.main(SELECTORS, CREDS)


        setTimeout(() => console.log('wait'), 1000)

    } catch (err) {
        console.log(err)
    }


})(CONFIG.main.email, CONFIG.main.password, CONFIG.main.url)

