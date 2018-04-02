const PUPPETEER = require('puppeteer');
const CHEERIO = require('cheerio');
const MOMENT = require('moment');
const NOTIFY = require('./emailNotification');


module.exports = exports = (SELECTORS, Map) => {

    return new Promise((resolve, reject) => {

        setTimeout( async () => {

            let i = 0;
            const NOW = MOMENT();
            const KEYWORD = SELECTORS.keyword.trim();

            try {
                console.log('<<<Starting Scrapping');

                //launching pupeteer
                const BROWSER = await PUPPETEER.launch({
                    headless: true,
                    timeout: 0
                });

                //launching Browser
                const PAGE = await BROWSER.newPage();

                //going to scrapping url
                await PAGE.goto(SELECTORS.scrapingUrl, {
                    timeout: 3000000
                });

                // getting all posts innerHTML
                const POSTS =  await PAGE.evaluate( selector => [...document.querySelectorAll(selector)].map(ele => ele.innerHTML), `[role='article']`);

                //getting links and url from posts
                for(let post of POSTS) {

                    let containsKeyword;
                    let $ = CHEERIO.load(post);
                    let title = $('p').text();
                    let url = $('._3m6- > div').find('a').attr('href');
                    let linksTitle = $('._6m3._--6').text();


                    if(url || title || linksTitle) {

                        //if post is a video
                        if (url.includes('video')) url = 'https://facebook.com' + url;

                        if (title.includes(KEYWORD)) containsKeyword = title;
                        else if (linksTitle.includes(KEYWORD)) containsKeyword = linksTitle;

                        if (containsKeyword && !Map.has(title)) {
                            console.log('**** Found new post!!');

                            console.log(await NOTIFY.success(containsKeyword, SELECTORS.scrapingUrl, url, KEYWORD));

                            Map.set(title, NOW.format('MM-DD'))
                        }
                    }
                    i++;
                }

                console.log('<<<Stopping Scrapping');

                BROWSER.close();

                resolve(Map)

            } catch(err) {
                reject(err)
            }
        }, 10000)

    })

};
