let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 8080;
var path = require('path');
let License = require('./app/routes/License');
let admin = require('./app/routes/admin');
let user = require('./app/routes/user');
let config = require('config'); //we load the db location from the JSON files
//db options
let options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
    , useNewUrlParser: true, useUnifiedTopology: true
};

//db connection   
try {
    mongoose.connect('mongodb://localhost:27017/XD', options);
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
} catch (e) {
    throw (e);
}

//don't show the log when it is test
if (config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

//parse application/json and look for raw text                                        
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
var optionsPaths = {
    root: path.join(__dirname)
};
app.get('/', function (req, res) {
    res.sendFile("static/index.html", optionsPaths, function (err) { if (err) { next(err); } });
});

app.get('/assets/p5', function (req, res) {
    res.sendFile("static/p5.js", optionsPaths, function (err) { if (err) { next(err); } });
});

app.get('/assets/p5dom', function (req, res) {
    res.sendFile("static/p5.dom.js", optionsPaths, function (err) { if (err) { next(err); } });
});

app.get('/assets/sketch', function (req, res) {
    res.sendFile("static/sketch.js", optionsPaths, function (err) { if (err) { next(err); } });
});
app.get('/assets/template', function (req, res) {
    res.sendFile("static/assets/aadhar.png", optionsPaths, function (err) { if (err) { next(err); } });
});
app.get('/assets/jquery', function (req, res) {
    res.sendFile("static/jquery-3.6.0.js", optionsPaths, function (err) { if (err) { next(err); } });
});
app.route("/License")
    .post(License.createlicense)
    .get(License.getBlock)
    .put(License.updateBlock);

app.route("/user")
    .post(user.createUser)
    .get(user.getaUser)
    .put(user.updateUser);

app.route("/admin")
    .post(admin.createAdmin)
    .put(admin.updateAdmin)

app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing