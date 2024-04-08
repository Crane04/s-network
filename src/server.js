const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser')
const User = require("./models/userModel")
const userRoutes = require("./routes/userRoutes")
const app = express()

app.use(cookieParser());
app.use(express.json());
app.use("/accounts",userRoutes)

mongoose.connect("mongodb+srv://admin:admin@socialnetwork.kyrqrkj.mongodb.net/socialnetwork?retryWrites=true&w=majority&appName=socialnetwork")
.then(() => {
    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    })
})
.catch((error) => {
    console.error(error)
    console.log("An error occured, failed to connect to database")
})
