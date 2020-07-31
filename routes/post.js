const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')

router.post('/createpost',(req,res)=>{
     const{title,body}=req.body
     if(!title || !body){
         res.json({error:"Please add all the fields"})
         return;
     }

})