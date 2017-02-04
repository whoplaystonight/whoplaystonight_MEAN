var email = require('../utils/email.js');

exports.sendEmailContact = function (req, res) {

    email.sendEmail(req, res);

};
