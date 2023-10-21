const { Schema, model } = require('mongoose');
const {fieldSchema} = require('./entityFields');

const entitySchema = new Schema({
    id:  String,
    name: String,
    path: String,
    fields: [fieldSchema],
    type: String,
    isReadonly: Boolean
  },{ versionKey: false });
const EntityModel = model('Entities',entitySchema,collection= 'entities');

module.exports = {EntityModel};