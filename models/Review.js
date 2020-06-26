const mongoose = require('mongoose')

let reviewSchema = new mongoose.Schema({
    expId: {
        type: String,
        required: true,
        ref: "exp"
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "user"
    },
    content: {
        type: String,
        required: true,
        trim: true
    }
})

let Review = mongoose.model("review", reviewSchema)
module.exports = Review