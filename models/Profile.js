const mongoose = require('mongoose')

const ProfileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    age: {
        type: Number
    },
    location: {
        type: Object
    },
    isFemale: {
        type: Boolean
    },
    lookingFor: {
        type: Array
    },
    summary: {
        type: String
    },
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },



})

let Profile = mongoose.model("profile", ProfileSchema)
module.exports = Profile
