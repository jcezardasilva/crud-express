const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const router = require("express").Router();
const { calcSkip } = require('../core/skipper');

const peopleSchema = new Schema({
    id:  String,
    first: String,
    last: String,
    description: String
  });
const peopleModel = model('People',peopleSchema,collection = 'people');

const people = {
    async add(data){
        data.id = uuidv4();
        const entity = new peopleModel(data);
        await entity.save();
        return entity;
    },
    async delete(id){
        return await peopleModel.deleteOne({id: id});
    },
    async list(page=1,pageSize=100){
        return await peopleModel.find({},null,{skip: calcSkip(page,pageSize),limit: pageSize});
    },
    async get(id){
        return await peopleModel.findOne({id: id});
    },
    async update(id,data){
        const update = {
            first: data.first,
            last: data.last,
            description: data.description
        }
        return await peopleModel.findOneAndUpdate({id: id},update)
    }
}

router.get("/",async function(req,res){
    res.status(200).json(await people.list(req.query["page"],req.query["pageSize"]));
});
router.post("/",async function(req,res){
    res.status(200).json(await people.add(req.body));
})
router.get("/:id",async function(req,res){
    res.status(200).json(await people.get(req.params.id));
});
router.put("/:id",async function(req,res){
    res.status(200).json(await people.update(req.body.id,req.body));
})
router.delete("/:id",async function(req,res){
    res.status(200).json(await people.delete(req.params.id));
})

module.exports = router;