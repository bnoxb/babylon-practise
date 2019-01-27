const express   = require('express');
const router    = express.Router();

router.get('/', (req,res)=>{
    res.render('./ship/index.ejs');
})

module.exports = router;