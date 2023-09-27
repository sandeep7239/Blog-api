const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
    try{
   const token=req.headers.authorization.split(" ")[1];
   console.log(token);
   const verify=jwt.verify(token,'this is the blog secret key');
   if(verify){
    next();
   }
   else{
    return res.status(401).json({
        message:'Auth failed token not matched'
    })
   }
    }
    catch(error ){
        return res.status(401).json({
            message:'Auth failed token not matched'
        })
    }
}