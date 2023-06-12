const express = require('express');
const userModel = require('../model/user.Schema');
const jwt=require("jsonwebtoken")
const bcrypt = require("bcrypt")
const userRouter=express.Router();


userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body
    try{
        const user= await userModel.findOne({email:email})
        if(!user){
            bcrypt.hash(password,3,async(err, hash)=>{
                const newUser=new userModel({name,email,gender,password:hash,age,city,is_married})
                await newUser.save()
                res.json({msg:"Registration successful",newUser})
                
            });
        }else{
            res.json({msg:"User already exist, please login"})
        }

    }catch(err){
        res.json({msg:err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user= await userModel.findOne({email:email})
    try{
        if(user){
            bcrypt.compare(password,user.password, (err, result)=>{
                if(result){
                    const  token = jwt.sign({userID:user._id,userName:user.name },"masai",{expiresIn:"7d"});
                    res.json({msg:"Login successful",token:token})
                }else{
                    res.json({msg:"Login failed!!"})
                }
                
            });
        }else{
            res.json({msg:"Please Register first..."})
        }

    }catch(err){
        res.json({msg:err.message})
    }
})

module.exports =userRouter