const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const User=require('../models/user')
const{JWT_SECRET}=require('../keys')
 const requirelogin=require('../middleware/requirelogin')

router.post('/signup',(req,res)=>{
    var {name,email,password}=req.body
    if(!name || !email ||!password)
      return res.status(422).json("Add all fields")

    bcrypt.hash(password,12)
      .then(hashedpassword=>{
        User.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser){
                return res.status(422).json("Already member exist")
            }
            const user=new User({
                name,
                email,
                password:hashedpassword
            })
            user.save()
            .then(user=>{
                res.json("saved succesfully")
            })
            .catch(err=>{
                console.log(err)
            })
      })
 
           
})
.catch(err=>{
    console.log(err)
}) 

})


router.post('/login',(req,res)=>{
  const{email,password}=req.body
  if(!email || !password)
    return res.status(422).json({message:"Add the required fields"})
    
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser)
        return res.status(422).json({error:"Invalid email or password"})

        bcrypt.compare(password,savedUser.password)            //return boolean
        .then(domatch=>{
           if(domatch){
               // res.json("Succesfuly signed in")
               const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
               res.json(token)
           }
            
            else
            res.status(422).json({error:"Invalid email or passsword"})
        })    

    })
    .catch(err=>{
        console.log(err);
    })
    
})


router.get('/protected',requirelogin,(req,res)=>{
    res.send("hello")
})


module.exports=router
