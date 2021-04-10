var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let crypto = require('crypto');
const keygen = require('../models/Keygen');

let UserSchema = new Schema(
    {
        // u_id :{type: String,default:short.generate()},
        u_name: { type: String, required: true },
        pass: { type: String, required: true },
        u_phone: { type: Number, required: true },
        hash: {type:String, required:true},
        publickey: { type: String, default: keygen.genkey.getPublic('hex') },
        privatekey: { type: String, default: keygen.genkey.getPrivate('hex') },
        hashs: {

            hash1: { type: string, required: true },
            hash2: { type: string, required: true },
            hash3: { type: string, required: true },
            // hash4 : {type: string,required: true},
            // hash5 : {type: string,required : true},
            // hash6 : {type: string,required :true},

        }
    },
    {
        versionKey: false,
        collection: 'user',
    }
);
UserSchema.statics = {
    isValid(user) {
        return this.find({})
    }
}

const user = mongoose.model('user', UserSchema);
module.exports = user;