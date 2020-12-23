var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//let short = require("short-uuid");

let AdminSchema = new Schema(
    {
        A_name :{type:String,required:true},
    //    A_id : {type:String,default:short.generate()},
        pass :{type : String,required:true},
        privatekey:{type : String, required:true},
        publickey:{type : String, required: true},
    },
    {
        versionKey:false,
        collection:'admin',
    }
);
AdminSchema.statics ={
    isValid(admin){
        return this.find({})
    }
}

const admin = mongoose.model('admin',AdminSchema)
module.exports = admin;
