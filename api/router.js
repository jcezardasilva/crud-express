const router = require("express").Router();
const crud = require("./crud");
const entities = require('./entities').router;

router.get("/",function(_req,res){
    res.send('I am alive');
});
router.use('/crud/:entityPath',crud);
router.use('/entities',entities);

module.exports = router;