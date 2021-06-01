var mongoose = require('mongoose');
var Schema = mongoose.Schema;
let crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const keygen = require('../models/Keygen');
const key = keygen.genkey();
let UserSchema = new Schema(
    {
        u_id :{type: String,required : true},
        u_name: { type: String, required: true },
        fname:{type: String, required: false},
        pass: { type: String, required: true },
        u_email: { type: String, required: true },
        hash: {type:String, required:true},
        publickey: { type: String, default: key.getPublic('hex') },
        privatekey: { type: String, default: key.getPrivate('hex') },
        createdAt: {type: Date, default: Date.now()},
        hashs: {
            hash1: { type: String, default: "" },
            hash2: { type: String, default: "" },
            hash3: { type: String, default: "" },
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

module.exports =  mongoose.model('user', UserSchema);
