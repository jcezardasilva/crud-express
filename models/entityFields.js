const { Schema } = require('mongoose');

const fieldSchema = new Schema({
    id:  String,
    name: String,
    label: String,
    dataType: String,
    inputType: String,
    required: Boolean,
    visibleOnForm: Boolean,
    visibleOnTable: Boolean,
    isKey: Boolean,
    isReadonly: Boolean
},{ versionKey: false });

module.exports = {fieldSchema};