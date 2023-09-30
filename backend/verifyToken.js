const jwt= require('jsonwebtoken');
const verifyToken= (req,res,next)=>{
    
    // const token= req.cookies.token;
    const token= req.headers.authorization.slice(7);
    // const sample= "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTE1MTAxZWNlOTE0NjlhN2VlYjA4OGUiLCJ1c2VybmFtZSI6InJhaiIsImVtYWlsIjoicmFqQGdtYWlsLmNvbSIsImlhdCI6MTY5NjA3MzI1NiwiZXhwIjoxNjk2MzMyNDU2fQ.m0p_JeBukZv97QKJQ5QmP7W_gYyt6_n8Uk70aLDSLRg";
    // const token = sample.slice(7);
    console.log(token);
    if(!token){
        return res.status(401).json('You are not authenticated!');
    }
    jwt.verify(token,process.env.SECRET,async (err,data)=>{
        if(err){
            return res.status(403).json('Token is not valid!');
        }
        req.userId=data._id;
        next();
    })
};

module.exports= verifyToken