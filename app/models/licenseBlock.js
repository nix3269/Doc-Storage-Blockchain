let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const License = require('./license.js')
//book schema definition
let LicenseSchema = new Schema(
    {
        fromAddress: { type: String, required: true },
        toAddress: { type: String, required: true },
        hash: { type: String, required: true },
        prev_hash: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        License: {type: Object,required: true}
    },
    {
        versionKey: false
    }
);

// Sets the createdAt parameter equal to the current time
LicenseSchema.pre('save', next => {
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

//Exports the BookSchema for use elsewhere.
module.exports = mongoose.model('licenseBlock', LicenseSchema);

