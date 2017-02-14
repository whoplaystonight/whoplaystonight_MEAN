var passport = require('passport');

exports.signup = function (req, res) {
    console.log(res);
    passport.authenticate('local-signup', function (err, user, info) {
        if (err) {
            return res.send('err');
        }
        if (!user) {
            return res.send('name');
        }
        return res.send(true);
    }
    )(req, res);
};

exports.signin = function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
        if (err) {
            return res.send('err');
        }
        if (!user) {
            return res.send('errorcredentials');
        }
        return res.send(user);
    })(req, res, next);
};
exports.loginfacebook = function (req, res, next) {
    console.log('LogIn Facebook - server > users.controller ----------');
    passport.authenticate('facebook', { scope: ['email', 'public_profile'] })(req, res, next);
};
exports.logintwitter = function (req, res, next) {
    passport.authenticate('twitter')(req, res, next);
};

exports.success = function (req, res) {
    res.json(req.user);
};

exports.loggedin = function (req, res) {
    console.log('LOGGEDIN ' + JSON.stringify(req.user));
    console.log('session ' + JSON.stringify(req.session));
    console.log(req.isAuthenticated());

    res.send(req.isAuthenticated() ? req.user : '0');
};
