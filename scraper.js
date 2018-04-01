const PUPPETEER = require('puppeteer');
const CHEERIO = require('cheerio');
const fs = require('fs');


exports.main = (SELECTORS, CREDS) => {

    return new Promise((resolve, reject) => {

        setTimeout( async () => {
            try {
                console.log('<<<Starting Scrapping')

                //launching pupeteer
                const BROWSER = await PUPPETEER.launch({
                    headless: true,
                    timeout: 0
                })

                //launching Browser
                const PAGE = await BROWSER.newPage()

                // //Going to scrapping url
                // await PAGE.goto(SELECTORS.mainUrl, {
                //     timeout: 3000000
                // })
                //
                // // //entering username
                // await PAGE.click(SELECTORS.email)
                // await PAGE.keyboard.type(CREDS.email)
                //
                // //entering password
                // await PAGE.keyboard.press('Tab')
                // await PAGE.keyboard.type(CREDS.password)
                // await PAGE.click(SELECTORS.submit)
                //
                // await PAGE.waitForNavigation({ timeout: 120000 });

                //going to custom scrapping url
                await PAGE.goto(SELECTORS.scrapingUrl, {
                    timeout: 3000000
                })



                // const RESULT = await PAGE.$$(`[role='article']`, body => body.innerHTML)

                const POSTS =  await PAGE.evaluate( selector => [...document.querySelectorAll(selector)].map(ele => ele.innerHTML), `[role='article']`)


                let obj = {}
                let i = 0
                let title;
                let url
                for(let post of POSTS) {
                    let $ = CHEERIO.load(post)

                    title = $('p').text()
                    url = $('._3m6- > div').find('a').attr('href')
                    if(url || title) obj[i] = {}

                    if (title) obj[i]['title'] = title
                    if (url) obj[i]['url'] = url

                    i++
                }

                console.log(obj)

                // const RESULT = await PAGE.$x('//*[@id="content_container"]', (body) => body.innerText)
                //
                //
                //
                // let text = await PAGE.evaluate((body) => body.innerHTML, RESULT[0])
                //
                // let $ = CHEERIO.load(text)
                //
                // let div =  $('div:nth-child(2)').html()
                //
                // fs.writeFile('text1.txt',POSTS, (err) => {
                //     if(err) console.log(err)
                // })

                console.log('<<<Stopping Scrapping')

                BROWSER.close();

                resolve('Successfully scrapped')

            } catch(err) {
                reject(err)
            }
        }, 1000)

    })

}
