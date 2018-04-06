const PUPPETEER = require('puppeteer');
const CHEERIO = require('cheerio');
const NOW = require('moment')();
const NOTIFY = require('./emailNotification');
const REQUESTSMODEL = require('./RequestModel');


module.exports = exports = (map) => {

    return new Promise((resolve, reject) => {

        setTimeout( async () => {

            const REQUESTS = await REQUESTSMODEL.find();

            let result = [];

            try {
                console.log('<<<Starting Scrapping');

                //launching pupeteer
                const BROWSER = await
                PUPPETEER.launch({
                    headless: true,
                    timeout: 0
                });

                //starting to scrape by req
                for(let req of REQUESTS) {
                    const scrapUrl = req.url;
                    const KEYWORD = req.keyword.trim();

                    //launching Browser
                    const PAGE = await BROWSER.newPage();
                    //going to scrapping url
                    await PAGE.goto(scrapUrl, {
                        timeout: 3000000
                    });

                    // getting all posts innerHTML
                    const POSTS = await PAGE.evaluate(selector => [...document.querySelectorAll(selector)].map(ele => ele.innerHTML), `[role='article']`);
                    //getting links and url from posts
                    for (let post of POSTS) {

                        let containsKeyword;
                        let $ = CHEERIO.load(post);
                        let title = $('p').text();
                        let url = $('._3m6- > div').find('a').attr('href');
                        let linksTitle = $('._6m3._--6').text();


                        if (url || title || linksTitle) {

                            //if post is a video
                            if (url.includes('video')) url = 'https://facebook.com' + url;

                            if (title.includes(KEYWORD)) containsKeyword = title;
                            else if (linksTitle.includes(KEYWORD)) containsKeyword = linksTitle;

                            if (containsKeyword) {
                                if (!map.get(req.email)) {
                                    let temp = new Map()
                                    temp.set(containsKeyword, NOW.format('MM-DD'))
                                    console.log('**** Found new post!!');
                                    console.log(await NOTIFY.success(containsKeyword, scrapUrl, url, KEYWORD, req.email))
                                    map.set(req.email, temp)
                                }
                                if(!map.get(req.email).has(containsKeyword)) {
                                    console.log('**** Found new post!!');
                                    console.log(await NOTIFY.success(containsKeyword, scrapUrl, url, KEYWORD, req.email))
                                    map.get(req.email).set(containsKeyword, NOW.format('MM-DD'))
                                }
                            }
                        }
                    }
                }
                console.log('<<<Stopping Scrapping');

                BROWSER.close();

                resolve(map)

                } catch (err) {
                    reject(err)
                }
        }, 1000)

    })

};
