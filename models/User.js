const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const PASSWORDLENGTH=8;

const todoschema=mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: [5, 'your title needs to be at least 5 characters']
    },
    description: {
        type: String,
        required: true,
        minlength: [10, 'Your task needs to be more descriptive! 10 characters please!']
    }
})
const userschema=mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [PASSWORDLENGTH, `Passwords must have at least this many letters: ${PASSWORDLENGTH}`]
    },
    todos:[todoschema]
})

userschema.pre('save', hashPassword);

userschema.statics.login=login;

/**
 * @param {*} username of the user to log in
 * @param {*} password of the user to log in
 * @returns the user if credentials is successfully validated or null in any other case.
 */
async function login(username, password){
    let loginresult = null;
    const user = await this.findOne({username});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth) loginresult=user;
    }
    return loginresult;
}

async function hashPassword(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
}

const User = mongoose.model('user',userschema);

module.exports=User;