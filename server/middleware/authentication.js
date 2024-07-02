const jwt = require("jsonwebtoken");
const user = require("../model/user");
const SECRET_KEY = process.env.SECRET_KEY


const Aunthentication = async (req, res, next)=>{
    
const token = req.cookies.newToken;
if(!token){
   return res.status(401).send({messaga : "Token not available"})
}
try{
const verifyToken = jwt.verify(token, SECRET_KEY);
const userDAta =await user.findOne({email: verifyToken.email}).select({
    password:0
});
if(!userDAta){
   console.log("user not found");
}

req.token = token;
req.userId = userDAta._id;
req.user = userDAta;
next();
} 

catch(err){
    console.error(err)
    return res.status(401).send({messaga :"invalid request ,unathorized token"})
}


}

module.exports= Aunthentication;