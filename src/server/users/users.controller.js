var passport = require('passport');

exports.signup = function (req, res) {
    passport.authenticate('local-signup', function (err,user, info){
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

exports.localSignin = function (req, res, next) {
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