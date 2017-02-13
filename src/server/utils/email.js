var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var sg = process.env.SENDGRID_API_KEY;
// var sg = require('../sendgrid.env');

exports.sendEmail = function(req, res) {
    
    // var emailTo = '';
    // var emailFrom = '';
    var emailTo = req.body.from;
    var emailFrom = req.body.to;
    var body = '<body>' +
    '<div id="contact-email">' +
    '<div> <h1>Contact with WhoPlaysTonight</h1> <h4>Subject: ' + req.body.subject +
    '</h4></div>' +
    '<section>' +
    'Name:<p>' + req.body.name + '</p>' +
    'Email: <p>' + req.body.from + '</p>' +
    'Message:<p>' + req.body.text + '</p></section>' +
    '</div>' +
    ' </body>';

    var template =
    '<html>' +
    '<head>' +
    '<meta charset="utf-8" />' +
    '<style>' +
    '* {' +
    'box-sizing: border-box;' +
    '-webkit-box-sizing: border-box;' +
    '-moz-box-sizing: border-box;' +
    '-webkit-font-smoothing: antialiased;' +
    '-moz-font-smoothing: antialiased;' +
    '-o-font-smoothing: antialiased;' +
    'font-smoothing: antialiased;' +
    'text-rendering: optimizeLegibility;}' +
    ' body { color: #C0C0C0; font-family: Arial, san-serif;}' +
    ' h1 { margin: 10px 0 0 0;}' +
    ' h4 { margin: 0 0 20px 0;}' +
    ' #contact-email {' +
    'background-color: rgba(72, 72, 72, 0.7);' +
    'padding: 10px 20px 30px 20px;' +
    ' max-width: 100%;' +
    ' float: left;' +
    'left: 50%;' +
    'position: absolute;' +
    'margin-top: 30px;' +
    ' margin-left: -260px;' +
    ' border-radius: 7px;' +
    '-webkit-border-radius: 7px;' +
    '-moz-border-radius: 7px;}' +
    ' #contact-email p { font-size: 15px; margin-bottom: 10px;' +
    'font-family: Arial, san-serif; }' +
    ' #contact-email p {' +
    'width: 100%;' +
    'background: #fff;' +
    'border: 0;' +
    '-moz-border-radius: 4px;' +
    '-webkit-border-radius: 4px;' +
    ' border-radius: 4px;' +
    ' margin-bottom: 25px;' +
    ' padding: 10px; }' +
    '@media only screen and (max-width: 580px) {' +
    '#contact-form {' +
    ' left: 3%;' +
    ' margin-right: 3%;' +
    ' width: 88%;' +
    ' margin-left: 0;' +
    ' padding-left: 3%;' +
    ' padding-right: 3%; } }' +
    '</style>' +
    '</head>' + body + '</html>';

    var email = {
        // from: emailFrom,
        from: req.body.from,
        // to: emailTo,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text,
        html: template
    };
    console.log(email);

    // API KEY Sendgrid
    var options = {
        auth: {
            api_key: sg
        }
    };
    var mailer = nodemailer.createTransport(sgTransport(options));
    switch (req.body.messageDirection) {
        case 'to_admin':
            mailer.sendMail(email, function (error, info) {
                if (error) {
                    res.status('401').json({
                        err: info
                    });
                } else {
                    res.status('200').json({
                        success: true
                    });
                }
            });
            break;

        case 'to_user':
            var email2 = {
                from: emailFrom,
                // from: req.body.from,
                to: emailTo,
                // to: req.body.to,
                subject: req.body.subject,
                text: req.body.text,
                html: template
            };
            mailer.sendMail(email2, function (error, info) {
                if (error) {
                    res.status('401').json({
                        err: info
                    });
                } else {
                    res.status('200').json({
                        success: true
                    });
                }
            });
            break;
    }   

};
