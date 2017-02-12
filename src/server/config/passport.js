var LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const OAuthStrategy = require('passport-oauth').OAuthStrategy; //encara que no es gaste, fa falta
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy; //encara que no es gaste, fa falta
var TwitterStrategy = require('passport-twitter').Strategy;
var bcrypt = require('bcrypt-nodejs');
var connection = require('../config.db.js');
var userModel = require('../users/users.model');


module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, username, password, done) {
            // we are checking to see if the user trying to login already exists
            console.log("llega a passport");

            userModel.countUsers(username, function (error, rows) {
                if (rows[0].total > 0) {
                    return done(null, false, 'That username is already taken.');
                } else {
                    var addnewuserinbd = {
                        username: username,
                        email: req.body.email,
                        name: '',
                        password: bcrypt.hashSync(password, null, null),  // use the generateHash function in our user model
                        type: 'client'
                    };
                    userModel.addUserDB(addnewuserinbd, function (error, rows) {
                        if (error) {
                            return done(error);
                        }
                        if (rows) {
                            return done(null, addnewuserinbd);
                        }
                    });
                }
            });
        })
    );


    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, user, password, done) {
            userModel.getUser(user, function (error, rows) {
                if (!rows.length) {

                    return done(null, false, 'nouser');
                }
                if (!bcrypt.compareSync(password, rows[0].password)) {

                    return done(null, false, 'wrongpassword');
                } else {

                    return done(null, rows[0]);
                }
            });

        })
    );


    // =========================================================================
    // FACEBOOK  SIGNIN ========================================================
    // =========================================================================
    
    passport.use(new FacebookStrategy({
        clientID: '1839022376365731',
        clientSecret: 'ca0cd5c294acd3848a04804f864ae7ed',
        callbackURL: "http://localhost:8001/api/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'name', 'gender', 'photos'],
        passReqToCallback: true
    },
        function (req, accessToken, refreshToken, profile, cb) {
            /*User.findOrCreate({ facebookId: profile.id }, function (err, user) {
              return cb(err, user);
            });*/
            userModel.countUsers(profile.id, function (error, rows) {
                console.log(profile);
                if (rows[0].total > 0) {
                    console.log("Existe y no se crea")
                    return cb(null, profile);
                } else {
                    var addnewuserinbd = {
                        username: profile.id,
                        email: '',
                        name: profile.name.givenName,
                        password: '',
                        type: 'client'
                    };
                    console.log(addnewuserinbd);
                    userModel.addUserDB(addnewuserinbd, function (error, rows) {
                        if (error) {
                            return cb(error);
                        }
                        if (rows) {
                            return cb(null, profile);
                        }
                    });
                }
            });
        }
    ));

    // =========================================================================
    // TWITTER  SIGNIN ========================================================
    // =========================================================================    
    passport.use(new TwitterStrategy({
        consumerKey: 'VXHPUwMBneLkzmgWBSZs1mLiF',
        consumerSecret: 'O1H9NH68tnTYhq7pMFk0WfVRhivwAGqUcRLb06Y0lERH1xfhou',
        callbackURL: "http://127.0.0.1:8001/api/auth/twitter/callback"
    },
        function (token, tokenSecret, profile, cb) {
            console.log(profile)
            userModel.countUsers(profile.id, function (error, rows) {
                if (rows[0].total > 0) {
                    console.log("Existe y no se crea")
                    return cb(null, profile);
                } else {
                    var addnewuserinbd = {
                        username: profile.id,
                        email: '',
                        name: profile.displayName,
                        password: '',
                        type: 'client'
                    };
                    console.log(addnewuserinbd);
                    userModel.addUserDB(addnewuserinbd, function (error, rows) {
                        if (error) {
                            return cb(error);
                        }
                        if (rows) {
                            return cb(null, profile);
                        }
                    });
                }
            });
        }
    ));
};
