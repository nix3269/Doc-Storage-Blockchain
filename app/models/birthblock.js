let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BirthSchema = new Schema(
    {
        fromAddress: { type: String, required: true },
        toAddress: { type: String, required: true },
        hash: { type: String, required: true },
        prev_hash: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        Birth: {type: Object,required: true}
    },
    {
        versionKey: false
    }
);

// Sets the createdAt parameter equal to the current time
BirthSchema.pre('save', next => {
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model('birthBlock', BirthSchema);

