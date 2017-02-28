var log4js = require('log4js');
log4js.configure('./config/log4js.json');

module.exports.logger = function (name) {
    return log4js.getLogger(name);
};