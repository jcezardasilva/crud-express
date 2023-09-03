const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const router = require("express").Router();

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
    async getAll(){
        return await contactModel.find().limit(100);
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

router.get("/",async function(_req,res){
    res.status(200).json(await contact.getAll());
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