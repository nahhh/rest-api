var userModel = require('../models/userModel');

// get list user
exports.getListUser = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            res.json({error: err}, null, 4);
        }

        let sql = 'SELECT * FROM MT_ROLE';

        connection.query(sql, function(err, rows) {
            if (err) {
                console.log(err);
                return next(err);
            }

            res.json(rows);
        })
    });
};

exports.getUser = function(req, res) {
    res.send('Not implemented: get user by id');
}