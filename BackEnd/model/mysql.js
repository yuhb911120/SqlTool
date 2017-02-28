var mysql = require('mysql');

var connection = mysql.createPool(config.mysql);

module.exports.get = function (req, res) {
    var sql = req.query.sql;

    connection.query(sql, function (err, result) {
        if (err) {
            res.status(200).send({Error: err});
            return;
        }
        res.status(200).send({rows: result});
    });
};