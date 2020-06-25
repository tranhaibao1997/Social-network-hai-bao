var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middlewares/auth')



//Login 
router.post("/login", async(req, res, next) => {
    let { email, password } = req.body
    try {
        let user = await User.comparePassword(email, password)
        let token = user.generateToken()
        console.log(token)
        res.send({
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: user.tokens[user.tokens.length - 1]


            },
            message: "Success"
        })
    } catch (err) {
        res.send(err)
    }
})

//Get current user
router.get("/me", auth, async(req, res, next) => {
    res.send(req.user)
})


//change password
router.patch("/changePassword", auth, async(req, res, next) => {
    try {
        let { newPassword } = req.body
        let user = req.user
        user.password = newPassword
        user.tokens = []
        await user.save()
        res.status(201).send({
            data: user,
            message: "change password successfully"
        })
    } catch (err) {
        res.status(400).send({
            errors: err,
            message: "Cant not change the password"
        })
    }



})

//log out
router.get("/logOut", auth, async(req, res, next) => {
    try {
        let user = req.user
        user.tokens.splice(user.tokens.length - 1, 1)
        await user.save()
    } catch (err) {

    }
})


module.exports = router;