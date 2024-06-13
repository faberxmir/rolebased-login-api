const {Schema, model} = require('mongoose')

const aliasSchema = new Schema({
    alias: {
        type: String,
        unique: true
    },
    pool: {
        type: Number,
        unique: true
    }
})

const Alias = model('alias', aliasSchema)