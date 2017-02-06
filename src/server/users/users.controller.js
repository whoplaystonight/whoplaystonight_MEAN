var users = require('./users.model.js');

exports.signup = function (req, res) {
    users.insertUser(req.body,
            function (err, callback) {
                if (err) { res.send(err); }
                res.json(callback);
            }
    );
};
