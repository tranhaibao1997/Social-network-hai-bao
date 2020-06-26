var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs')
var Tag = require('../models/Tag')
    //create Tag

router.post('/createTag', async(req, res) => {
    try {
        console.log("dsjkhfiusbfdsubfdjshg")
            // let { name } = req.body
        let newTag = new Tag({ name: req.body.name })
        await newTag.save();
        res.status(200).send({
            data: newTag,
            message: "created tag successfully"

        })
    } catch (err) {
        res.status(400).send({
            errors: err,
            message: "fail"
        })
    }



})





module.exports = router;