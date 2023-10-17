const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const router = require("express").Router();
const { calcSkip } = require('../core/skipper');

const contactSchema = new Schema({
    id:  String,
    personId: String,
    name: String,
    phone: String,
  });
const contactModel = model('Contacts',contactSchema,collection= 'contacts');

const contact = {
    async add(data){
        data.id = uuidv4();
        const entity = new contactModel(data);
        await entity.save();
        return entity;
    },
    async delete(id){
        return await contactModel.deleteOne({id: id});
    },
    async list(page=1,pageSize=100){
        return await contactModel.find({},null,{skip: calcSkip(page,pageSize),limit: pageSize});
    },
    async get(id){
        return await contactModel.findOne({id: id});
    },
    async update(id,data){
        const update = {
            personId: data.personId,
            name: data.name,
            phone: data.phone
        };
        return await contactModel.findOneAndUpdate({id: id},update)
    }
}

router.get("/",async function(req,res){
    res.status(200).json(await contact.list(req.query["page"],req.query["pageSize"]));
});
router.post("/",async function(req,res){
    res.status(200).json(await contact.add(req.body));
})
router.get("/:id",async function(req,res){
    res.status(200).json(await contact.get(req.params.id));
});
router.put("/:id",async function(req,res){
    res.status(200).json(await contact.update(req.body.id,req.body));
})
router.delete("/:id",async function(req,res){
    res.status(200).json(await contact.delete(req.params.id));
})

module.exports = router;