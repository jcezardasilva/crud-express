const { Schema, model } = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const router = require("express").Router();

const pageSchema = new Schema({
    id:  String,
    name: String,
    path: String,
    fields: Array
  });
const pageModel = model('Pages',pageSchema);

const page = {
    async add(data){
        data.id = uuidv4();
        const person = new pageModel(data);
        await person.save();
        return person;
    },
    async delete(id){
        return await pageModel.deleteOne({id: id});
    },
    async getAll(){
        return await pageModel.find().limit(100);
    },
    async get(id){
        return await pageModel.findOne({id: id});
    },
    async update(id,data){
        return await pageModel.updateOne({id: id},{data})
    },
    async getAllLocal(){
        return [{
            "id": "1",
            "name": "People",
            "path": "people",
            "fields": [{
                name: "id",
                label: "Id",
                dataType: "String",
                inputType: 'text',
                visibleOnForm: false
            },{
                name: "first",
                label: "First",
                dataType: "String",
                inputType: 'text',
                required: true
            },{
                name: "last",
                label: "Last",
                dataType: "String",
                inputType: 'text',
                required: true
            },{
                name: "handle",
                label: "Handle",
                dataType: "String",
                inputType: 'textarea',
                visibleOnTable: false,
                visibleOnForm: true
            }]
        },{
            "id": "2",
            "name": "Contacts",
            "path": "contacts",
            "fields": [{
                name: "id",
                label: "Id",
                dataType: "String",
                inputType: 'text',
                visibleOnForm: false
            },{
                name: "name",
                label: "Name",
                dataType: "String",
                inputType: 'text',
                required: true
            },{
                name: "phone",
                label: "Phone",
                dataType: "String",
                inputType: 'text',
                required: true
            }]
        }];
    }
}

router.get("/",async function(_req,res){
    res.status(200).json(await page.getAll());
});
router.post("/",async function(req,res){
    res.status(200).json(await page.add(req.body));
})
router.get("/:id",async function(req,res){
    res.status(200).json(await page.get(req.params.id));
});
router.put("/:id",async function(req,res){
    res.status(200).json(await page.update(req.body.id,req.body.data));
})
router.delete("/:id",async function(req,res){
    res.status(200).json(await page.delete(req.params.id));
})

module.exports = router;