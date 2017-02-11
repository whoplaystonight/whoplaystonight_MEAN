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

exports.loginfacebook = function (req, res, next){
    console.log("LogIn Facebook - server > users.controller ----------");
    passport.authenticate('facebook', function (err, user, info){
        if(err){
          return res.send('err');
        }else if(!user){
            return res.send('err');
        }
        console.log(user);
        return res.send(user);
    })(req, res, next);
};

exports.loginfacebookcallback = function (req, res, next){
    passport.authenticate('loginfacebookcallback', function(err, user, info){
        console.log("CALLBACK____________");
        if(err){
          return res.send('err');
        }else if(!user){
            return res.send('err');
        }
        return res.send(req.user);
    })(req, res, next); 
};