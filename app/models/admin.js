var mongoose = require('mongoose');
const keygen = require('../models/Keygen');
var Schema = mongoose.Schema;
//let short = require("short-uuid");

let AdminSchema = new Schema(
    {
        A_name :{type:String,required:true},
    //    A_id : {type:String,default:short.generate()},
        pass :{type : String,required:true},
      //  privatekey:{type : String, required:true},
        publickey:{type : String, default: keygen.genkey.getPublic('hex')},
    },
    {
        versionKey:false,
        collection:'admin',
    }
);

const admin = mongoose.model('admin',AdminSchema)
module.exports = admin;
