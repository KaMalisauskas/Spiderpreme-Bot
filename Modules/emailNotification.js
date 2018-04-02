const NODEMAILER = require('nodemailer');
const CONFIG = require('../config.json');


class Notify {

    confEmail() {
        return CONFIG.newsletter.email
    }

    password() {
        return CONFIG.newsletter.password
    }

    async success(header, scpraingUrl, url, keyword) {
        if(!keyword && !url) throw new Error("Nothing to send");

        const transporter = NODEMAILER.createTransport({
            service: "Gmail",
            secure: false,
            port: 25,
            auth: {
                user: this.confEmail(),
                pass: this.password()
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const HelperOptions = {
            from:`"Spiderpreme_Bot" <${this.confEmail()}`,
            to: CONFIG.newsletter.toEmail,
            subject: `New Post with keyword(s) ${keyword}`,
            html: `
                <h3>We found a post containing your requested keyword in page ${scpraingUrl}!!</h3>
                <p>The word was used in this sentence:</p>
                <p>${header}</p>
                <p>Link to article:</p>
                <a href="${url}">Proceed to link!</a>
                <br/><br/><br/>
                <p>Yours sincerely:</p>
                <p>Spiderpreme Bot</p> 
            `,
        };

        try{
            await transporter.sendMail(HelperOptions);
            return 'Email sent successfully'
        } catch(error) {
            return error
        }

    }

    async error(err, keyword) {

        const transporter = NODEMAILER.createTransport({
            service: "Gmail",
            secure: false,
            port: 25,
            auth: {
                user: this.confEmail(),
                pass: this.password()
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const HelperOptions = {
            from:`"Spiderpreme_Bot" <${this.confEmail()}`,
            to: 'karolis.malisauskas@gmail.com',
            subject: `Error occurred while scrapping`,
            html: `
                <p>Sadly, an error occurred while scrapping ${keyword}</p>
                <p>Error:</p>
                <p><b>${err}</b></p>
            `
        };

        try{
            await transporter.sendMail(HelperOptions);
            return 'Email sent successfully'
        } catch(error) {
            return error
        }
    }

}

module.exports = new Notify();