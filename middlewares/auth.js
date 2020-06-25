const jwt = require("jsonwebtoken")
const User = require("../models/User")

async function auth(req, res, next) {
    console.log("da zo")
    try {
        const token = req.header('Authorization').replace('Bearer ', "")
        console.log(token)
        const decode = jwt.verify(token, "samsamdendayanne");
        console.log(decode)
        const user = await User.findOne({ _id: decode._id, tokens: decode._id })
        if (!user) {
            throw new Error("Cant not find the user")
        }
        console.log(user)
        req.user = user
        next()

    } catch (err) {
        console.log(err)
        res.status(401).send({ err: 'Please authenticate' })
    }
}
module.exports = auth