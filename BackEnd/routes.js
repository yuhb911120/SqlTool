module.exports = function (app) {
    var mysql = require('./model/mysql');

    app.get('/', function (req, res) {
        res.sendFile('index.html', {root: __dirname + '/../Front/dist'});
    });

    app.get('/report', mysql.get);
};