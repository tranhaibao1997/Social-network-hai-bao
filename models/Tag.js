const mongoose = require('mongoose')
const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "tag name is required"],
        unique: true,

    }
})
let Tag = mongoose.model("tag", tagSchema)
module.exports = Tag