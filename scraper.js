const puppeteer = require('puppeteer');

exports.main = async (SELECTORS, CREDS) => {

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
    await PAGE.keyboard.type(CREDS.email)

    //entering password
    await PAGE.keyboard.press('Tab')
    await PAGE.keyboard.type(CREDS.password)
    await PAGE.click(SELECTORS.submit)

    await PAGE.waitForNavigation();

    //going to custom scrapping url
    await PAGE.goto(SELECTORS.scrapingUrl)

    console.log( await PAGE.$x(`//*[@id="u_fetchstream_2_t"]/div/div[1]/span/div[2]/a`) )

    BROWSER.close();
}