const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createuser = async (req,res)=> {
    const {username,password} = req.body;
    let feedback = createFeedback(404, `${username} could not be created.`);

    if(typeof(username) !== 'undefined' && typeof(password) !== 'undefined'){
        try {
            const result = await User.create({username,password});
            if(result) {
                feedback = createFeedback(200, `${username} was created!`,true, result);
            }
        } catch(error) {
            feedback = createFeedback(409, `${username} could not be created!`, false, error)
        }
    }
    res.status(feedback.statuscode).json(feedback);
}

const deleteuser = async (req, res)=>{
    const {username} = req.body;
    let feedback = createFeedback(404, `User ${username} could not be deleted`);
    if(typeof(username)!=='undefined'){
        const result = await User.findOneAndDelete({username});
        if(result){
            feedback=createFeedback(200, `${username} was deleted!`, true, result);
        }
    }
    res.status(feedback.statuscode).json(feedback);
}

const authenticateuser = async (req, res)=>{
    const {username, password} = req.body;
    let feedback=createFeedback(401, `${username} could not be athenticated`);

    const user = await User.login(username,password);
    if(user){
        //expiration: one hour
        const token = jwt.sign({user}, process.env.JWTSECRET, {expiresIn:1000*60*60});
        feedback=createFeedback(200, `${username} was authenticated`, true, {JWT: token})
    } 
    res.status(feedback.statuscode).json(feedback);
}

/**
 * @param {*} req 
 * @param {*} res 
 * The function will look for title and description in the body of the request object.
 * If either of those variables is not present. Then a json object relaying the failure
 * will be rendered.
 */
const createtodo = async (req,res)=>{
    const {title, description, user}=req.body;
    let result= createFeedback(404, 'Faulty inputdata');

    if(typeof(title)!=='undefined'&&typeof(description)!=='undefined'&& typeof(user)!=='undefined'){
        const todo ={title,description};
        const tempres = await User.findOneAndUpdate(
            {_id:user._id}, 
            {$push:{todos:todo}}
        );
        result=createFeedback(200, 'Todo was inserted to the database',true, tempres);
    }
    res.status(result.statuscode).json(result);
}

/**
 * @param {*} statuscode has to be set manually
 * @param {*} feedback has to be set manually
 * @param {*} isSuccess defaults to false, must be overridden if true
 * @param {*} payload defaults to null
 * This factory method standardises the feedback from this API
 */
function createFeedback(statuscode, feedback, isSuccess=false,payload=null){
    return {
        statuscode,
        feedback,
        isSuccess,
        payload
    }
}

module.exports={
    createtodo,
    createuser,
    authenticateuser,
    deleteuser
}