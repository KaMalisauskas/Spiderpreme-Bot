Spiderpreme-Bot
Spider bot 🕷, which scans given Facebook page (i.e. facebook.com/hypebeast) for some kind of Keyword and send notification to user via Email.

Using Puppeteer.js for headless chrome and EC2 for server.

This branch has multi-user capability.

1. Every loop custom scraper goes through all requests and check for keyword in facebook.
2. Stores all posts with keyword in hasmap
3. Cleans HasMap from old posts containing given keyword.
4. Repeat!
