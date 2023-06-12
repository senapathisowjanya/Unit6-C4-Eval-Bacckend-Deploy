const express = require('express');
const conne = require('./connection/db');
const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/posts.routes');
const auth = require('./middeleware/auth');
require("dotenv").config()
const app = express();
app.use(express.json());

app.use("/users",userRouter)
app.use(auth)
app.use("/posts",postRouter);


app.listen(process.env.PORT,async()=>{
    try{
        await conne
        console.log(`listening on ${process.env.PORT}`)
        console.log("connecting to db...")

    }catch(err){
        console.log("somthing went wrong")
    }
})