var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

//Create User

router.post("/createUser",
  [
    check('email', 'Please include a valid email').isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }
    const { name, email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).send({
          errors: "User already existed"
        })
      }
      const salt = 8
      const hashedPassword = await bcrypt.hash(password, salt)

      let newUser = new User({
        name: name, email: email, password: hashedPassword
      })
      await newUser.save()
      res.status(201).send({
        data: newUser,
        message: "Success ^^"
      })
    }
    catch (err) {
      res.status(400).send({
        errors: err,
        message:"Something went wrong!"

      })
    }



  })

module.exports = router;
