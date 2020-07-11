const express=require('express');
const mongoose=require('mongoose')
const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//qP2GjZntb5dbVCdP
const {MONGOURI}=require('./keys')
app.use(require('./routers/auth'))

require('./models/user')

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true

})

mongoose.connection.on('connected',()=>{
    console.log("Connected Succesfully")
})
mongoose.connection.on('error',(err)=>{
    console.log("Error while Connecting",err)
})

















app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})