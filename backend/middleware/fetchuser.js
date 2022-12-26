var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Signed$by$SMANotebook'

const fetchuser =  (req,res,next)=>{
    // get user from the jwt tokenand id to req obj
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user= data.user
        next();
    } catch (error) {
        res.status(401).send({error:"please authenticate using a valid1 token"})
    }
}
module.exports = fetchuser