import * as nodemailer from "nodemailer";

const settings  = require("../settings");


class Mailer{
    constructor(){
        this.createBasicTransporter();
    }
    createBasicTransporter(opts){
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: settings.EMAIL_NAME,
                pass: settings.EMAIL_PASSWORD
            }
        })
    };
    sendMail(mailObj){
        var mailOptions = {
            from: `${mailObj.from} <${settings.EMAIL_NAME}>`,
            to: mailObj.email,
            subject: mailObj.subject,
            text: mailObj.body,

        };
        console.log(`Email has been sent to ${mailObj.email}`);
        this.transporter.sendMail(mailOptions, function (err, res) {
            if (err) {
                console.log('Error', err);
            } else {
                console.log(`Email has been sent to ${mailObj.email}`);
            }

        })
    }
}

export default Mailer;