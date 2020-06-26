var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

//Create User

router.post("/register", [
        check('email', 'Please include a valid email').isEmail(),
        check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })
    ],
    async(req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() })
        }
        const { name, email, password, type } = req.body

        try {
            let user = await User.findOne({ email })
            if (user) {
                return res.status(400).send({
                    errors: "User already existed"
                })
            }

            let newUser = new User({
                name: name,
                email: email,
                password: password,
                type: type || "normal"

            })
            await newUser.save()
            newUser = await newUser.generateToken()
            res.status(201).send({
                data: newUser,
                message: "Success ^^"
            })
        } catch (err) {
            res.status(400).send({
                errors: err,
                message: "Something went wrong!"

            })
        }



    })




module.exports = router;