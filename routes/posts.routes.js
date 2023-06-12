const express = require('express');
const postModel = require('../model/posts.schema');
const postRouter=express.Router();

postRouter.post("/add", async(req, res)=>{
    const payload = req.body
    const newPost = postModel(payload)
    await newPost.save()
    res.json({msg: "Post uploaded"})
})

postRouter.get("/", async(req, res)=>{
    const min = req.query.min
    const max = req.query.max
    const postData = await postModel.find({userID:req.body.userID})
    res.json(postData)
})

postRouter.get("/comment", async(req, res)=>{
    const min = req.query.min
    const max = req.query.max
    const postData = await postModel.find({$and:[{no_of_comments:{$gt:min},no_of_comments:{$lt:max}}]})
    res.json(postData)
})
postRouter.get("/top", async(req, res)=>{
    const data = await postModel.find({userID:req.body.userID}).sort({ no_of_comments: -1 }).limit(3)
    res.json(data)
})
postRouter.get("/specific", async(req, res)=>{
    const device = req.query
    const data = await postModel.find(device)
    res.json(data)
})
postRouter.patch("/update/:id", async(req, res)=>{
    const payload = req.body
    const id = req.params.id
    try{
        const updata = await postModel.findOne({_id:id})
        if(updata){
            const updatedData = await postModel.findByIdAndUpdate({ _id: id }, payload)
            res.json({ msg: "Post updated suceesfully",updatedData})
        }else{
            res.json({ msg: "Post does not exist"})
        }
    }catch(err){
        res.json({ msg: err.message})
    }
})
postRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    const updata = await postModel.findOne({_id:id})
    try{
        if(updata){
            const updatedData = await postModel.findByIdAndDelete({ _id: id })
            res.json({msg: "Post Deleted succesfully",updatedData})
        }else{
            res.json({ msg: "Post does not exist"})
        }
    }catch(err){
        res.json({ msg: err.message})
    }
})



module.exports =postRouter