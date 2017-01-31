var Controller = require ('./contact.controller');

module.exports = function(app) {
    app.post('/api/sendemail', Controller.sendEmailContact);
};
