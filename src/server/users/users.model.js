var connection = require('../config/config.db.js');

var usersModel = {};

usersModel.countUsers = function (username, callback) {
    if (connection) {
        var query = 'SELECT COUNT(*) as total FROM users WHERE username like "' + username + '"';
        connection.query(query, function (error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, rows);
            }
        });
    }
};

usersModel.addUserDB = function (user, callback) {
    if (connection) {
        var queryinsert = 'INSERT INTO users ( username, email, name, password, type )'+
                            'values ("' + user.username + '","' + user.email +
                            '","' + user.name + '","' + user.password + '","' + user.type + '")';
        connection.query(queryinsert, function (error, rows) {
            if (error) {
                console.log('error insert db');
                throw error;
            } else {
                console.log('insertado correctamente');
                callback(null, rows);
            }
        });
    }
};

usersModel.getUser = function (user, callback) {
    if (connection) {
        //var sql = 'SELECT * FROM users WHERE id = ' + id;
        //'SELECT * FROM users WHERE id =' + id, function (err, rows)
        connection.query('SELECT * FROM users WHERE username like "' + user + '"',
        function (error, row) {
            if (error) {
                throw error;
            } else {
                callback(null, row);
            }
        });
    }
};

module.exports = usersModel;
