var express = require('express')
var router = express.Router()
// const fs=require('fs');
router.get('/',(req,res)=>{
    let fileName=req.query.file;
    
    res.sendFile(process.cwd()+'/uploads/'+fileName);
})


module.exports = router