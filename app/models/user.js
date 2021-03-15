var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//let short = require("short-uuid");


let UserSchema = new Schema(
    {
       // u_id :{type: String,default:short.generate()},
        u_name :{type : String,required:true},
        pass :{type : String,required:true},
        privatekey:{type : String, required:true},
        publickey:{type : String, required: true},
        hashs: [
            {
                hash1 : {type: string, required : true},
                hash2 : {type: string,required :true},
                hash3 : {type: string,required : true},
                hash4 : {type: string,required: true},
                hash5 : {type: string,required : true},
                hash6 : {type: string,required :true},
            } 
        ]
    },
    {
        versionKey:false,
        collection:'user',
    }
);
UserSchema.statics ={
    isValid(user){
        return this.find({})
    }
}
const user = mongoose.model('user',UserSchema);
module.exports = user;