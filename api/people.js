const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const router = require("express").Router();

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
    async getAll(){
        return await peopleModel.find().limit(100);
    },
    async get(id){
        return await peopleModel.findOne({id: id});
    },
    async update(id,data){
        const update = {
            first: data.first,
            last: data.last,
            handle: data.handle
        }
        return await peopleModel.findOneAndUpdate({id: id},update)
    },
    async getAllLocal(){
        return [{
            "id": "1",
            "first": "Mark",
            "last": "Otto",
            "handle": "@mdo"
        },{
            "id": "2",
            "first": "Jacob",
            "last": "Thornton",
            "handle": "@fat"
        },{
            "id": "3",
            "first": "Larry",
            "last": "Bird",
            "handle": "@twitter"
        }];
    }
}

router.get("/",async function(_req,res){
    res.status(200).json(await people.getAll());
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