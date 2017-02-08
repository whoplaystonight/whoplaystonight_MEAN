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
