let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const Aadhar = require('./aadhar.js')

let AadharSchema = new Schema(
    {
        fromAddress: { type: String, required: true },
        toAddress: { type: String, required: true },
        hash: { type: String, required: true },
        prev_hash: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        Aadhar: {type: Object,required: true}
    },
    {
        versionKey: false
    }
);

// Sets the createdAt parameter equal to the current time
AadharSchema.pre('save', next => {
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model('aadharBlock', AadharSchema);

