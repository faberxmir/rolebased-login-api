const jwt=require('jsonwebtoken');
const User = require('../models/User');

const {createFeedback,accessDenied}=require('../handlers/feedbackHandler');

const authenticate = (req,res,next) => {
    const token = req.headers.authorization?.split(' ')[1];
    const feedback = accessDenied();

    if(typeof(token)!=='undefined'&&typeof(token)==='string'){
        jwt.verify(token, process.env.JWTSECRET, async (err, decodedtoken)=>{
            if(!err){
                const {_id}=decodedtoken;
                try {
                    const user = await User.findOne({_id});
                    req.body.user=user;
                    next();
                } catch(error){
                    feedback = createFeedback(409, 'User not found!');
                }
            } 
        })
    } else {
        res.status(feedback.statuscode).json(feedback);
    }
}

const authorizeAdmin = (req,res,next)=>{
    const user = req.body.user;
    if(user && typeof(user) !== 'undefined' && user.role==='admin'){
        next();
    } else {
        const feedback = createFeedback(403, 'Not authorized!');
        res.status(feedback.statuscode).json(feedback);
    }
}
module.exports={
    authenticate,
    authorizeAdmin
}