var mongoose = require('mongoose');
const keygen = require('../models/Keygen');
var Schema = mongoose.Schema;
const key = keygen.genkey();
//let short = require("short-uuid");

let AdminSchema = new Schema(
    {
        a_name :{type:String,required:true},
    //    A_id : {type:String,default:short.generate()},
        a_pass :{type : String,required:true},
       privatekey:{type : String, default: key.getPrivate('hex')},
        publickey:{type : String, default: key.getPublic('hex')},
    },
    {
        versionKey:false,
        collection:'admin',
    }
);

const admin = mongoose.model('admin',AdminSchema)
module.exports = admin;
