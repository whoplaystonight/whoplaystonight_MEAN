var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcrypt-nodejs');
var mysql = require('../config.db');


module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        mysql.connection.query('SELECT * FROM users WHERE id =' + id, function (err, rows) {
            done(err, rows[0]);
        });
    });



    passport.use(
        'local-signup',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'user',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, user, password, done) {
            // we are checking to see if the user trying to login already exists
            mysql.connection.query('SELECT COUNT(*) AS userCount FROM users WHERE user like "' + user + '"',
            function (error, rows) {
                if (error){
                    return done(error);
                }
                if (rows[0].userCount >= 1) {
                    console.log('existe y no lo inserto');
                    return done(null, false, 'el nombre de usuario ya existe');
                } else {
                    // if there is no user with that username
                    // create the user
                    var newUser = {
                        password: bcrypt.hashSync(password, null, null),
                        email: req.body.email,
                        //usertype: req.body.usertype
                    };
                    console.log('no existe y lo inserto');
                    mysql.connection.query('INSERT INTO users SET ?', newUser, function (error, res) {
                        if (error){
                            return done(error);
                        }
                        return done(null, res);
                    });
                }
            });
        })
    );
};
