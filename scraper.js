const PUPPETEER = require('puppeteer');
const CHEERIO = require('cheerio');


exports.main = (SELECTORS, CREDS) => {

    return new Promise((resolve, reject) => {

        setTimeout( async () => {

            let obj = {}
            let i = 0
            let title
            let url

            try {
                console.log('<<<Starting Scrapping')

                //launching pupeteer
                const BROWSER = await PUPPETEER.launch({
                    headless: true,
                    timeout: 0
                })

                //launching Browser
                const PAGE = await BROWSER.newPage()

                //going to scrapping url
                await PAGE.goto(SELECTORS.scrapingUrl, {
                    timeout: 3000000
                })

                // getting all posts innerHTML
                const POSTS =  await PAGE.evaluate( selector => [...document.querySelectorAll(selector)].map(ele => ele.innerHTML), `[role='article']`)

                //getting links and url from posts
                for(let post of POSTS) {
                    let $ = CHEERIO.load(post)

                    title = $('p').text()
                    url = $('._3m6- > div').find('a').attr('href')
                    if(url || title) obj[i] = {}

                    if (title) obj[i]['title'] = title
                    if (url) obj[i]['url'] = url

                    i++
                }

                console.log('<<<Stopping Scrapping')

                BROWSER.close();

                resolve('Successfully scrapped')

            } catch(err) {
                reject(err)
            }
        }, 1000)

    })

}
