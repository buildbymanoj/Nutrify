const jwt = require('jsonwebtoken');

function verifyToken(req,res,next)
{
    if(req.headers.authorization!==undefined){

        let token=req.headers.authorization.split(" ")[1];

        jwt.verify(token,"nutrify",(err,dta)=>{
            if(!err){
                next();
            }
            else{
                res.send({message:"invalid token"})
            }
        })

    }
    else{
        res.send({message:"please send a token"})
    }
}

module.exports=verifyToken;