var LocalStrategy = require('passport-local').Strategy;

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
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        connection.query('SELECT * FROM users WHERE id =' + id, function (err, rows) {
            done(err, rows[0]);
        });
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

};
