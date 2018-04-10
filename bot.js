const CONFIG = require('./config.json');
const TIMESTOP = require('./Modules/TimeStop');
const CLEANER = require('./Modules/mapCleaner');
const NOTIFY = require('./Modules/emailNotification');
const BotSetup = require('./Modules/BotRecreation');


(async () => {

    try {
        let map = await BotSetup();
        while(true) {
            if(map.get('bot').length) {
                let newMapArray = await Promise.all(map.get('bot'));
                newMapArray.map(elem => map.set(elem.email, elem));
                map = await CLEANER(map);
                map = await BotSetup(map);
            } else {
                await TIMESTOP(10000)
                map = await BotSetup(map);
            }
        }


    } catch (err) {
        console.error(err);
        await NOTIFY.error(err, CONFIG.logEmail)
    }


})();

