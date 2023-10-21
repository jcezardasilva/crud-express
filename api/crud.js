const router = require("express").Router({ mergeParams: true });
const {crudRepository} = require("../repositories/crud");

router.get("/",async (req,res) =>{
    try {
        res.status(200).json(await crudRepository.list(req.params.entityPath,req.query["page"],req.query["pageSize"]));   
    } catch (error) {
        res.status(400).send(error.message);
    }
});
router.post("/",async (req,res)=>{
    try {
        res.status(200).json(await crudRepository.add(req.params.entityPath,req.body));
    } catch (error) {
        res.set('Content-Type', 'text/plain');
        res.status(400).send(error.message);
    }
});
router.get("/:id",async (req,res)=>{
    try {
        res.status(200).json(await crudRepository.get(req.params.entityPath,req.params.id));
    } catch (error) {
        res.set('Content-Type', 'text/plain');
        res.status(400).send(error.message);
    }
});
router.put("/:id",async (req,res)=>{
    try {
        res.status(200).json(await crudRepository.update(req.params.entityPath,req.body.id,req.body));
    } catch (error) {
        res.set('Content-Type', 'text/plain');
        res.status(400).send(error.message);
    }
});
router.delete("/:id",async (req,res)=>{
    try {
        res.status(200).json(await crudRepository.delete(req.params.entityPath,req.params.id));
    } catch (error) {
        res.set('Content-Type', 'text/plain');
        res.status(400).send(error.message);
    }
});

module.exports = router;