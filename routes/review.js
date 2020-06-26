var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
let Review = require('../models/Review')
let { auth } = require('../middlewares/auth')

//create review
router.post("/:expId/createReview", auth, async(req, res, next) => {
    try {
        let expId = req.params.expId
        let content = req.body["content"]
        console.log(req.user)
        let userId = req.user
        console.log(content, "AAAAAAAAAAAAAAAAAAAAAAAAAaaa")
        let newReview = new Review({
            ExpId: expId,
            userId,
            content
        })
        console.log(newReview)
        await newReview.save()
        res.status(201).send({
            data: newReview,
            message: "created review"
        })
    } catch (err) {

        res.status(400).send({
            errors: err,
            message: "create review fail"
        })
    }



})





module.exports = router;