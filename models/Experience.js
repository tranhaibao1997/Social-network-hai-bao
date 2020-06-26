const mongoose = require('mongoose')
const { schema } = require('./User')

const expSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 100,
        required: true
    },
    description: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 1000,
        required: true
    },
    host: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    tags: [{
        type: mongoose.Schema.ObjectId,
        ref: "tag",

    }],

}, {
    timestamps: true
})

schema.pre("save", async function(next) {
    console.log("before save")
    next();
})
let Exp = mongoose.model("exp", expSchema)
module.exports = Exp