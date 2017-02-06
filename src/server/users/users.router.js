var Controller = require ('./users.controller');

module.exports = function(app,passport) {

    app.post('/api/signup', passport.authenticate('local-signup',function(err,user,next) {
        console.log(err + "   <- err")
        console.log(user + "  <- user")
        console.log(next + "  <- next")
        //if (err){ return next(err);}
        //if (!user) {return next(null, false);}
        //return next(null, user);
    }));

};
