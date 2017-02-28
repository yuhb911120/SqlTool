var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.use("/js", express.static(__dirname + '/src/js'));
app.use("/assets", express.static(__dirname + '/src/assets'));
app.use("/tpl", express.static(__dirname + '/src/tpl'));
app.use("/bower_components", express.static(__dirname + '/bower_components'));

app.get('/', function (req, res) {
  res.sendFile('index.html', {root: __dirname + '/src'});
});

function createJWT(username) {
  var payload = 'eyJ1aWQiOiIxMjM0NTY3ODkwIiwibmlja25hbWUiOiJKb2huIFB1YiIsInJvbGUiOiJwdWJsaXNoZXIifQ';
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + payload + '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
}

app.use(function (req, res, next) {
  console.log('*** Request Method : ' + req.method + ', Request Url : ' + req.originalUrl);
  return next();
});

app.post('/auth/login', function (req, res) {
  var username = req.body.email;
  var password = req.body.password;
  if (username && password == '123') {
    res.send({token: createJWT(username)});
  } else {
    res.status(401).send({message: 'Invalid email and/or password!'});
  }
});

app.get('/report', function (req, res) {
  res.send({"Error":{"code":"ER_NO_SUCH_TABLE","errno":1146,"sqlState":"42S02","index":0}})
});

app.listen(8888, function () {
  console.log('server started success port : 8888');
});