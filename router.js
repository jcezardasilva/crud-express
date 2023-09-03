const router = require("express").Router();
const people = require('./api/people');
const contacts = require('./api/contacts');
const pages = require('./api/pages');

router.get("/",function(_req,res){
    res.send('I am alive');
});
router.use('/people',people);
router.use('/contacts',contacts);
router.use('/pages',pages);

module.exports = router;