const router = require("express").Router();
const people = require('./api/people');

router.get("/",function(_req,res){
    res.send('I am alive');
});
router.use('/people',people);

const peopleData = [{
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