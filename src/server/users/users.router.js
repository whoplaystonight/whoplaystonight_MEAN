var userscontroller = require('./users.controller');
var passport = require('passport');
module.exports = function (app) {

    app.post('/api/signup', userscontroller.signup);

    app.post('/api/signin', userscontroller.signin);

    //app.get('/api/loginFacebook', userscontroller.loginfacebook);
    app.get('/api/loginFacebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
    //app.get('/api/auth/facebook/callback', userscontroller.loginfacebookcallback);
    app.get('/api/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/locate',
        failureRedirect: '/signin'
    }));

    app.get('/api/loginTwitter', passport.authenticate('twitter'));
    app.get('/api/auth/twitter/callback',
        passport.authenticate('twitter', { failureRedirect: '/signin' }),
        function (req, res) {
            console.log('TWITTER login ' + JSON.stringify(req.user));
            res.redirect('/');
        });
};
