let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Template = new Schema(
    {
        Doctype: {type: String, required: true},
        temp: {type: Object,required: false}
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('templates', Template);