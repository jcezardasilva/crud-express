const { Schema, model, models } = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { calcSkip } = require('../core/skipper');
const { toProperCase } = require("../core/text");
const {EntityModel} = require("../api/entities")

function generateSchema(entityFields){
    var fields = entityFields.map(f=>{
        let field = {};
        field[f.name] = f.dataType === "object" ? Schema.Types.Mixed : f.dataType.indexOf("[]")>-1 ? [] : toProperCase(f.dataType);
        return field;
    });
    let options = {};
    for(const field of fields){
        options = Object.assign(options,field);
    }
    return new Schema(options,{ versionKey: false });
}
function generateModel(path,schema){
    const modelName = toProperCase(path);
    return models[modelName] || model(modelName,schema, collection = path);
}

async function configure(path){
    if(path == "entities") throw Error("entities is a system entity.");
    const entity = await EntityModel.findOne({"path": path})
    if(!entity) throw Error("Entity not found.");
    const schema = generateSchema(entity.fields);
    const Model = generateModel(entity.path,schema);
    return {
        entity,
        Model
    }
}

const crudRepository = {
    async add(path,data){
        if(!path) throw new Error("path is required");
        const {Model} = await configure(path);
        data.id = uuidv4();
        const crudEntity = new Model(data);
        await crudEntity.save();
        return crudEntity;
    },
    async delete(path,id){
        if(!path) throw new Error("path is required");
        const {Model} = await configure(path);
        return await Model.deleteOne({id: id});
    },
    async list(path,page=1,pageSize=100){
        if(!path) throw new Error("path is required");
        const {Model} = await configure(path);
        return await Model.find({},{_id:0, __v: 0},{skip: calcSkip(page,pageSize),limit: pageSize});
    },
    async get(path,id){
        const {Model} = await configure(path);
        if(!path) throw new Error("path is required");
        return await Model.findOne({id: id});
    },
    async update(path,id,data){
        if(!path) throw new Error("path is required");
        const {Model, entity} = await configure(path);
        const fields = entity.fields.filter(field=> !field.isReadonly);

        let dataset = {};
        for(const field of fields){
            dataset[field.name] = data[field.name];
        }
        return await Model.findOneAndUpdate({id: id},dataset)
    }
}

module.exports = {crudRepository};