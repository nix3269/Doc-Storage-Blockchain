let express = require('express');
let app = express();
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let port = 8080;
let License = require('./app/routes/License');
let config = require('config'); //we load the db location from the JSON files
//db options
let options = { 
                server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
                ,useNewUrlParser: true,useUnifiedTopology: true
              }; 

//db connection   
try{   
mongoose.connect('mongodb://localhost:27017/XD', options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
}catch(e){
    throw(e);
}

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

//parse application/json and look for raw text                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

app.get("/", (req, res) => res.json({message:"Welcome to our website"}));

app.route("/License")
    .post(License.createlicense)
    .get(License.getBlock)
    .put(License.updateBlock);

app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing