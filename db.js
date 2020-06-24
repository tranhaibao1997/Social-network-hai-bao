let mongoose = require("mongoose")

async function connectDB() {
    try {
        let url = "mongodb+srv://haibaotran:bibi2345@cluster0-7o2fm.mongodb.net/hai-bap-social-network?retryWrites=true&w=majority"
        let res = await mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true })
        console.log("connected to the database")
    }
    catch (err) {
        console.log(err)
    }

}

module.exports = connectDB