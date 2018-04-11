# Spiderpreme-Bot
Spider bot 🕷, which scans given Facebook page (i.e. facebook.com/hypebeast) for some kind of Keyword and send notification
to user via Email.

Using Puppeteer.js for headless chrome and EC2 for server.

This branch has multi-user capability. 

1. Every loop it checks MongoDB for requests from users (one user === 1 req).
2. Put does req in HasMap and push custom Scraper Promise to array.
3. Resolves all Scraper Bot req asynchronously.
4. Cleans HasMap from old posts containing given keyword.
5. Checks if there are updates or deletes to each req.
6. Repeat! 
