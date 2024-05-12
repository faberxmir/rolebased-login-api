const mongoose = require('mongoose');
const {Schema} = mongoose;

const refreshTokenSchema = new Schema({
    jwt: {
        type: String,
        required: true
    },
    cryptotoken: {
        type: String,
        required: true
    }
});

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

module.exports= RefreshToken;