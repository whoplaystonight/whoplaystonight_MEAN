var passport = require('passport');

exports.signup = function (req, res) {
    console.log(res)
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
}
exports.loginfacebook = function (){
    console.log("LogIn Facebook - server > users.controller ----------");
    passport.authenticate('facebook');
};

exports.loginfacebookcallback = function (req, res, next){
    console.log("callback");
    passport.authenticate('facebook', {failureRedirect: '/signup', succesRedirect: '/'}); 

};