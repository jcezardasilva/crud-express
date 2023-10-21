const { v4: uuidv4 } = require('uuid');
const router = require("express").Router();
const {EntityModel} = require("../models/entities");
const { calcSkip } = require('../core/skipper');

const entity = {
    async add(data){
        data.id = data.id || uuidv4();
        const entity = new entityModel(data);
        await entity.save();
        let response = {};
        for(const field of entity.fields){
            response[field.name] = entity[field.name];
        }
        return response;
    },
    async delete(id){
        return await EntityModel.deleteOne({id: id});
    },
    async list(page=1,pageSize=100){
        return await EntityModel.find({},{_id:0, __v: 0, "fields._id": 0},{skip: calcSkip(page,pageSize),limit: pageSize});
    },
    async get(id){
        return await EntityModel.findOne({id: id});
    },
    async update(id,data){
        const update = {
            name: data.name,
            path: data.path,
            fields: data.fields,
            type: data.type,
            isReadonly: data.isReadonly
        }
        return await EntityModel.findOneAndUpdate({id: id},update)
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

module.exports = {router, EntityModel};