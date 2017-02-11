var userscontroller = require('./users.controller');
module.exports = function (app) {

    app.post('/api/signup', userscontroller.signup);
    app.get('/api/loginFacebook', userscontroller.loginfacebook);
    app.get('/api/auth/facebook/callback', userscontroller.loginfacebookcallback);
};
