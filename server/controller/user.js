const user = (req,res,next)=>{

const userData = req.user;
return res.json({userData})
   
}

module.exports = user; 