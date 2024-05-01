const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {
    accessDenied,
    notAuthorized,
    createFeedback,
    tar,
    resourceNotFound
} = require('../handlers/feedbackHandler');

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

const upgradeuser = async (req, res)=>{
    const {username, isDowngrade} = req.body;
    let feedback = createFeedback(404, 'Faulty inputdata!');
    try{
        let targetUser = await User.findOne({username});
        const updateduser = await targetUser.changeUserRole(isDowngrade);
        feedback=createFeedback(200, 'Success', true, {username:updateduser.username,role:updateduser.role});
    } catch(error) {
        feedback=resourceNotFound();
    }
    res.status(feedback.statuscode).json(feedback);
}

const deleteuser = async (req, res)=>{
    const {username} = req.body;
    let feedback = createFeedback(404, `User ${username} could not be deleted`);
    if(typeof(username)!=='undefined'){
        try {

            const result = await User.findOneAndDelete({username});
            if(result){
                feedback=createFeedback(200, `${username} was deleted!`, true, result);
            }
        }catch(error){
            console.log('error!');
        }
    }
    res.status(feedback.statuscode).json(feedback);
}

const authenticateuser = async (req, res)=>{
    const {username, password} = req.body;
    let feedback=accessDenied();

    const user = await User.login(username,password);
    if(user){
        //expiration: one hour
        const token = jwt.sign({_id:user._id}, process.env.JWTSECRET, {expiresIn:"1h"});
        feedback=createFeedback(200, `${username} was authenticated`, true, {JWT: token});
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
        user.todos.push(todo);
        try {
            const updatedUser = await user.save();
            result=createFeedback(200, 'Todo was inserted to the database',true, updatedUser.todos);
        } catch (err) {
            result = createFeedback(500, 'Internal server error');
        }
    }
    res.status(result.statuscode).json(result);
}



module.exports={
    createtodo,
    createuser,
    authenticateuser,
    deleteuser,
    upgradeuser
}