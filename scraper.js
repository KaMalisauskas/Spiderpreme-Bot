const puppeteer = require('puppeteer');

exports.main = (SELECTORS, CREDS) => {

    return new Promise((resolve, reject) => {

        setTimeout( async () => {
            try {
                console.log('<<<Starting Scrapping')

                //launching pupeteer
                const BROWSER = await puppeteer.launch({
                    headless: false,
                    timeout: 0
                })

                //launching Browser
                const PAGE = await BROWSER.newPage()

                //Going to scrapping url
                await PAGE.goto(SELECTORS.mainUrl)

                // //entering username
                await PAGE.click(SELECTORS.email)
                await PAGE.keyboard.type(CREDS.email)

                //entering passwordç
                await PAGE.keyboard.press('Tab')
                await PAGE.keyboard.type(CREDS.password)
                await PAGE.click(SELECTORS.submit)

                await PAGE.waitForNavigation();

                //going to custom scrapping url
                await PAGE.goto(SELECTORS.scrapingUrl)


                // const RESULT = await PAGE.$x('//*[@id="u_fetchstream_2_t"]/div/div[1]/span/div[2]/div/div[1]/a', (body) => body.innerText)
                // const RESULT = await PAGE.$x('//*[@id="u_0_1o"]/div/div[1]/span/div[2]/div/div[1]/a', (body) => body.innerText)
                const RESULT = await PAGE.$x('//*[@id="u_0_3g"]/div/div[1]/span/div[2]/div/div[1]/a', (body) => body.innerText)


                let text = await PAGE.evaluate((body) => body.textContent, RESULT[0])
                console.log(text)

                console.log('<<<Stopping Scrapping')

                BROWSER.close();

                resolve('Successfully scrapped')

            } catch(err) {
                reject(err)
            }
        }, 1000)

    })

}
