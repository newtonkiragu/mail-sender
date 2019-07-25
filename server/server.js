let nodemailer = require("nodemailer");
let settings = require("../src/settings");
let bodyParser = require('body-parser');
// const email = settings.EMAIL_NAME

const http = require('http');
const express = require('express');
const app = express();
app.use(express.static('src'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', function(req, res) {
    res.send('todo api works');
});
const email_router = express.Router();
email_router.route('/email').post(function (req, res) {
    // console.log("yay", res.req.body);
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: settings.EMAIL_NAME,
            pass: settings.EMAIL_PASSWORD
        }
    });
    let mailOptions = {
        // should be replaced with real recipient's account
        to: res.req.body.to,
        subject: res.req.body.subject,
        text: res.req.body.text,
        // cc: req.body.cc
    };
    console.log(mailOptions.to);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.writeHead(200);
    res.send();
    // }

});
app.use("/create", email_router)
app.post('/send-email', function (req, res, next) {
    let psht = req.body;
    console.log(psht);
    // if (req == "POST") {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: settings.EMAIL_NAME,
            pass: settings.EMAIL_PASSWORD
        }
    });
    let mailOptions = {
        // should be replaced with real recipient's account
        to: req.body.email,
        subject: req.body.subject,
        body: req.body.body,
        cc: req.body.cc
    };
    console.log(req.body, mailOptions);
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log('Message %s sent: %s', info.messageId, info.response);
    // });
    res.writeHead(200);
    res.send();
    // }
});

const server = http.createServer(app);
const port = 3002;
server.listen(port);
console.debug('Server listening on port ' + port);