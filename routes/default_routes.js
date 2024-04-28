//Geir Hilmersen 
//Last edit 28 April 2024
const router = require('express').Router();

router.get('/courtesy-route',(req,res)=> {
    res.json({message:'you have connected to jwt-demoapp api, and it is running!'});
})

module.exports=router;