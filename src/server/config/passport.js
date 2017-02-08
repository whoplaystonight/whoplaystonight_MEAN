var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require('bcrypt-nodejs');
var connection = require('../config.db.js');


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
            if (connection) {
                console.log("conecta")
                console.log(username)
                console.log(password)
            } else {
                console.log("error")
            }
            var query = 'SELECT COUNT(*) as total FROM users WHERE username like "' + username + '"';
            connection.query(query, function (error, rows) {
                console.log(error);
                console.log(rows[0].total);
                if (error) {
                    console.log("error 1");
                    console.log(error);
                    console.log(rows);
                    //return done(err);
                }
                if (rows[0].total > 0) {
                    console.log("error 2");
                    console.log(error);
                    console.log(rows);
                    //return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                } else {
                    // if there is no user with that username
                    // create the user
                    console.log('create the user');
                    var addnewuserinbd = {
                        username: username,
                        email: req.body.email,
                        password: bcrypt.hashSync(password, null, null),  // use the generateHash function in our user model
                        type: 'client'
                    };
                    console.log(addnewuserinbd)
                    var queryinsert = 'INSERT INTO users ( username, email, name, password, type ) values ("' + addnewuserinbd.username + '","' + addnewuserinbd.email + '","","' + addnewuserinbd.password + '","' + addnewuserinbd.type + '")';
                    console.log(queryinsert)
                    connection.query(queryinsert, function (error, rows) {
                        if (error) {
                            console.log("error insert db");
                            return done(err);
                        } else {
                            console.log("insertado correctamente")
                            return done(null, addnewuserinbd);
                        }
                    });
                        /*var insertQuery = "INSERT INTO users ( username, password ) values (?,?)";

                        connection.query(insertQuery, [newUserMysql.username, newUserMysql.password], function (err, rows) {
                            newUserMysql.id = rows.insertId;

                            return done(null, newUserMysql);
                        });*/
                    }
            });
        })
    );
};
