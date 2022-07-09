const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const router = require("express").Router();

const peopleSchema = new Schema({
    id:  String,
    first: String,
    last: String,
    handle: String
  });
const peopleModel = model('People',peopleSchema);

const people = {
    async add(data){
        data.id = uuidv4();
        const person = new peopleModel(data);
        await person.save();
        return person;
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
        return await peopleModel.updateOne({id: id},{data})
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
    res.status(200).json(await people.update(req.body.id,req.body.data));
})
router.delete("/:id",async function(_req,res){
    res.status(200).json(await people.delete(req.params.id));
})

module.exports = router;