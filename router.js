const router = require("express").Router();

router.get("/",function(_req,res){
    res.send('I am alive');
});

router.get("/people",function(_req,res){
    res.status(200).json(people);
});
router.get("/people/:id",function(req,res){
    res.status(200).json(people.find(p=>p.id === req.params.id));
});

router.post("/people",function(_req,res){
    res.status(404).send('not implemented');
})
router.put("/people",function(_req,res){
    res.status(404).send('not implemented');
})
router.delete("/people",function(_req,res){
    res.status(404).send('not implemented');
})

const people = [{
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
}]
module.exports = router;