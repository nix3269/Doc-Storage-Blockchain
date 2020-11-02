let mongoose = require('mongoose');
let Schema = mongoose.Schema;
//book schema definition
let LatestSchema = new Schema(
    {
        doctype: { type: String, required: true },
        latesthash: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

//Exports the BookSchema for use elsewhere.
module.exports = mongoose.model('latestBlock', LatestSchema);

