const puppeteer = require('puppeteer');
const CONFIG = require('./config.json')

(async (email, password, url) => {
    const SELECTORS = {
        email: '#email',
        submit: '#loginbutton',
        mainUrl: 'https://fb.com',
        scrapingUrl: url

    }

    try {
        //launching pupeteer
        const BROWSER = await puppeteer.launch({
            headless: false
        })

        //launching Browser
        const PAGE = await BROWSER.newPage()

        //Going to scrapping url
        await PAGE.goto(SELECTORS.mainUrl)

        //entering username
        await PAGE.click(SELECTORS.email)
        await PAGE.keyboard.type(email)

        //entering password
        await PAGE.keyboard.press('Tab')
        await PAGE.keyboard.type(password)
        await PAGE.click(SELECTORS.submit)

        await PAGE.waitForNavigation();

        //going to custom scrapping url
        await PAGE.goto(SELECTORS.scrapingUrl)

        // console.log( await PAGE.$$(`#u_0_1u > div > div.lfloat._ohe > span > div._3ekx._29_4 > a`))

        BROWSER.close();

    } catch (err) {
        console.log(err)
    }


})(CONFIG.main.email, CONFIG.main.password, CONFIG.main.url)

