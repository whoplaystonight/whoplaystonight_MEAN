var userscontroller = require ('./users.controller');

module.exports = function(app) {

    app.post('/api/signup', userscontroller.signup);
    app.post('/api/localSignin', userscontroller.localSignin);

};
