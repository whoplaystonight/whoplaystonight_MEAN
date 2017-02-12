var userscontroller = require('./users.controller');
var passport = require('passport');
module.exports = function (app) {

    app.post('/api/signup', userscontroller.signup);

    app.post('/api/signin', userscontroller.signin);

    //app.get('/api/loginFacebook', userscontroller.loginfacebook);
    app.get('/api/loginFacebook', passport.authenticate('facebook'));
    //app.get('/api/auth/facebook/callback', userscontroller.loginfacebookcallback);
    app.get('/api/auth/facebook/callback', passport.authenticate('facebook')); 

};
