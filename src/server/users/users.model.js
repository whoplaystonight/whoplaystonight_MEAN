var mysql = require('../config.db');

var userModel = {};

userModel.insertUser = function(userData,callback){

    if (mysql.connection) {
        mysql.connection.query('INSERT INTO users SET ?', userData, function(err, result) {
            if(err){
                throw err;
            }else{
                callback(result);
            }
        });
    }
};

userModel.countUser = function(userData,callback){

    if (mysql.connection) {
        //mysql.connection.query('INSERT INTO users SET ?', userData.user, function(error, result) {
            mysql.connection.query('SELECT * FROM users WHERE user = ?',userData.user, function(err, rows) {
            if(err){
                throw err;
            }else{
                callback(rows);
            }
        });
    }
};

module.exports = userModel;
