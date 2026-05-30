const jwt=require('jsonwebtoken')
const authMiddleware=(req,res,next)=>{
    const authHeader=req.cookies.token
    if (!authHeader) {
        return res.status(401).json({ message: "1No token provided" });
    }
    const token=req.cookies.token
    try
    {
        const decoded=jwt.verify(token,"xxcv")
        console.log(typeof decoded);
        req.userId=decoded.id
        next()
    }
    catch(error)
    {
        return res.status(401).json({ message: "No token provided" });
    }
}
module.exports=authMiddleware