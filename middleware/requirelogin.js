const jwt=require('jsonwebtoken')
const{JWT_SECRET}=require('../keys')
const mongoose = require('mongoose')
const User = require('../models/user')


module.exports=(req,res,next)=>{
        const{authorization}  =   req.headers
        //authorization===Bearer <token>

        if(!authorization)
        return res.status(401).json({error:"You must logged in"} )

        const token=authorization.replace("Bearer ","")

        jwt.verify(token,JWT_SECRET,(err,payload)=>{
            if(err){
                return res.status(401).json({error:"You must logged in"})
            }

            const {_id}=payload
            User.findById(_id).then(userdata=>{
                req.user=userdata
            })
            next()
        })
}