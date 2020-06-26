var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const { auth } = require('../middlewares/auth');
const { authHost } = require('../middlewares/auth')
const Exp = require("../models/Experience")
const Tag = require("../models/Tag")


router.get("/", async(req, res) => {
    res.send("This is host page")
})

router.post("/createExp", auth, authHost, async(req, res) => {
    try {
        //exp: title, description, host 1-1, tags 1-n,
        let { title, description, tags } = req.body
        console.log(tags)
        let foo = tags.map(async(tag) => {
            let bar = await Tag.findOne({ name: tag })

            console.log(bar)
            console.log(tag);
            if (bar === null) {
                let newTag = new Tag({ name: tag })
                console.log(newTag);
                await newTag.save()
                return newTag

            } else {
                return bar
            }
        })
        let tagObject = await Promise.all(foo);
        console.log(tagObject)
        console.log("after that");
        // let newExp = new Exp({
        //     title: title,
        //     description: description,
        //     host: req.user._id,
        //     tags: tagObject
        // })
        // console.log(tagObject)
        // await newExp.save();
        let newExp = await Exp.create({
            title: title,
            description: description,
            host: req.user._id,
            tags: tagObject
        })
        res.status(201).send({
            data: newExp,
            message: "create Experience successfully"
        })
    } catch (err) {
        res.status(400).send({
            errors: err,
            message: "fail"
        })
    }











})





module.exports = router;