let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 8080;
const engines = require('consolidate');
var hbs = require('handlebars');
var path = require('path');
let License = require('./app/routes/License');
let Aadhar = require("./app/routes/Aadhar")
let Birth = require("./app/routes/Birth")
let admin = require('./app/routes/admin');
let user = require('./app/routes/user');
let template = require("./app/models/template")
let config = require('config'); //we load the db location from the JSON files
//db options
let options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
    , useNewUrlParser: true, useUnifiedTopology: true
};

//db connection   
try {
    mongoose.connect('mongodb+srv://nix:'+process.env.DB_PASS+'@lock-a-doc.znnfs.mongodb.net/Lock-a-doc?retryWrites=true&w=majority');
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

//Setup view engine
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

//parse application/json and look for raw text                                        
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.use(express.static('public'));
//Serving Files
app.get('/', function (req, res) {
    res.render("index", {});
});

//Serving APIS
app.route("/License")
    .post(License.createlicense)
    .get(License.getBlock)
    .put(License.updateBlock);

app.route("/Aadhar")
    .post(Aadhar.createBlock)
    .get(Aadhar.getBlock)
    .put(Aadhar.updateBlock);

app.route("/Birth")
    .post(Birth.createBlock)
    .get(Birth.getBlock)
    .put(Birth.updateBlock);

app.route("/user")
    .post(user.createUser)
    .get(user.getaUser)
    .put(user.updateUser);

app.route("/admin")
    .post(admin.createAdmin)
    .put(admin.updateAdmin);

app.get("/adminlogin",
    function (req, res) {
        res.render("admin1", {});
    });
app.post("/adminlogin",
    function (req, res) {
        admin.getAdmin(req,res);
    });

app.get('/docform', function (req, res) {
    res.render('docform', {});
});

app.get('/adminpage', function (req, res) {
    res.render('admin2', {});
});

app.get("/cardlogin", function (req,res){
    res.render('Cardlogin',{idval:req.query.id})
});

app.get("/printgen",function (req,res){
  let b="";
  let x = "";
      if(req.query.doctype == "Aadhar"){
        x=Aadhar.getBlock(req,res); 
      }else if(req.query.doctype == "License"){
        x=License.getBlock(req,res);
      }else{
        x=Birth.getBlock(req,res);  
      }                                               
});
app.post("/cardlogin", function (req,res){
    user.getaUser(req,res);
});

app.get('/createUser', function (req, res) {
    res.render('ctuser', {});
});

app.get("/template", function (req, res) {
    if (req.query.doctype) {
        template.findOne({ Doctype: req.query.doctype }, (err, block) => {
            if (err) res.send({ message: "Error Occured", Error: err })
            if (block) {
                res.json(block);
            } else {
                res.send({ message: "Template for Document type not found" })
            }
        });
    } else {
        res.send({ message: "Required parameter not entered" })
    }
});

app.listen(port);
console.log("Listening on port " + port);

module.exports = app