const router = require("express").Router();
const people = require('./api/people');
const contacts = require('./api/contacts');
const entities = require('./api/entities');
const entityFields = require('./api/entityFields').router;

router.get("/",function(_req,res){
    res.send('I am alive');
});
router.use('/people',people);
router.use('/contacts',contacts);
router.use('/entities',entities);
router.use('/entityfields',entityFields);

module.exports = router;