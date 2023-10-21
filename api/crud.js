const router = require("express").Router({ mergeParams: true });
const {crudRepository} = require("../repositories/crud");

router.get("/",async (req,res) =>res.status(200).json(await crudRepository.list(req.params.entityPath,req.query["page"],req.query["pageSize"])));
router.post("/",async (req,res)=>res.status(200).json(await crudRepository.add(req.params.entityPath,req.body)));
router.get("/:id",async (req,res)=>res.status(200).json(await crudRepository.get(req.params.entityPath,req.params.id)));
router.put("/:id",async (req,res)=>res.status(200).json(await crudRepository.update(req.params.entityPath,req.body.id,req.body)));
router.delete("/:id",async (req,res)=>res.status(200).json(await crudRepository.delete(req.params.entityPath,req.params.id)));

module.exports = router;