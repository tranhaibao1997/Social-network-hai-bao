const mongoose = require('mongoose');
const { hash } = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User must have a name"],
        trim: true,
        minLength: 3
    },
    email: {
        type: String,
        required: [true, "User must have an email"],
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "User must have a password"]
    },
    tokens: [{
        type: String
    }] // array of tokens
}, {
    timestamps: true
})
userSchema.pre("save", async function (next) {

    const user=this;
    if(user.isModified("password"))
    {
        user.password=await hash(user.password,8)
    }
    console.log("before saving")
    next();
})

let User = mongoose.model("user", userSchema)


module.exports = User