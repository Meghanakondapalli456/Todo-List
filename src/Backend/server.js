const express = require("express")
const dotEnv = require("dotenv")
const {MongoClient}=require("mongodb")

const app = express()
dotEnv.config()
MongoClient.connect('mongodb+srv://Meghana:rams7267@usermanagement.5y3i4.mongodb.net/UserManagement')
.then(()=>{
    console.log("MongoDB connected successfully")
})
.catch((error) =>{
    console.log("ERROR",error)
})

constPORT = 3000

console.log(process.env)

app.listen(8080,()=>  {
     console.log("server started and running at ${PORT}")
})