const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const router = require("express").Router();
const { calcSkip } = require('../core/skipper');

const fieldSchema = new Schema({
    id:  String,
    name: String,
    label: String,
    dataType: String,
    inputType: String,
    required: Boolean,
    visibleOnForm: Boolean,
    visibleOnTable: Boolean,
    isKey: Boolean
});
const entityModel = model('EntityFields',fieldSchema,collection= 'entity_fields');

const entity = {
    async add(data){
        data.id = data.id || uuidv4();
        const entity = new entityModel(data);
        await entity.save();
        return entity;
    },
    async delete(id){
        return await entityModel.deleteOne({id: id});
    },
    async list(page=1,pageSize=100){
        return await entityModel.find({},null,{skip: calcSkip(page,pageSize),limit: pageSize});
    },
    async get(id){
        return await entityModel.findOne({id: id});
    },
    async update(id,data){
        const update = {
            name: data.name,
            label: data.label,
            dataType: data.dataType,
            inputType: data.inputType,
            required: data.required,
            visibleOnForm: data.visibleOnForm,
            visibleOnTable: data.visibleOnTable
        }
        return await entityModel.findOneAndUpdate({id: id},update)
    }
}

router.get("/",async function(req,res){
    res.status(200).json(await entity.list(req.query["page"],req.query["pageSize"]));
});
router.post("/",async function(req,res){
    res.status(200).json(await entity.add(req.body));
})
router.get("/:id",async function(req,res){
    res.status(200).json(await entity.get(req.params.id));
});
router.put("/:id",async function(req,res){
    res.status(200).json(await entity.update(req.body.id,req.body));
})
router.delete("/:id",async function(req,res){
    res.status(200).json(await entity.delete(req.params.id));
})

module.exports = {router,fieldSchema};