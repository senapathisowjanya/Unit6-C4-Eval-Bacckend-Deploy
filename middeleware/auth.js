const jwt =require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.authorization
    try{
        if(token){
            const decoded=jwt.verify(token,"masai")
            if(decoded){
             req.body.userID=decoded.userID
             req.body.name=decoded.name
             next()
            }
        }else{
            res.json({msg:"Invalid token"})
        }

    }catch(err){
       res.json({err:err.message})
    }
}

module.exports=auth