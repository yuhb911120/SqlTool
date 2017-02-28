var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var log = require('./model/log').logger('App');

global.config = require('./config/config');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/assets", express.static(__dirname + '/../Front/dist/assets'));
app.use("/tpl", express.static(__dirname + '/../Front/dist/tpl'));


require('./routes')(app);

process.on('uncaughtException', function (err) {
    log.error('uncaughtException : ');
    log.error('Error Code : ' + err.code + ', ' + err);
});

app.use(function (req, res) {
    log.error('Not Found');
    res.status(404).send({message: 'Not Found'});
    return;
});

app.use(function (err, req, res, next) {
    if (err) {
        log.error('Internal error : ' + err);
        res.status(500).send({message: 'Internal error!'});
        return;
    }
    next;
});

app.listen(8888, function () {
    log.info('server started success port : 8888');
});