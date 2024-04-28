const jwt=require('jsonwebtoken');

const requireAuth = (req,res,next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(typeof(token)!=='undefined'&&typeof(token)==='string'){
        jwt.verify(token, process.env.JWTSECRET, async (err, decodedtoken)=>{
            if(!err){
                const {user}=decodedtoken;
                req.body.user=user;
                next();
            } else {
                res.status(404).json({message:"Access denied!"});
            }
        })
    } else {
        res.status(404).json({message:"Access denied!"})
    }
}

module.exports={
    requireAuth
}