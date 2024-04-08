const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser')
const userRoutes = require("./routes/userRoutes")
const postRouter = require("./routes/postRoutes")
require('dotenv').config();
const port = process.env.PORT || 3000
const db_url = process.env.DB_URL || "mongodb+srv://admin:admin@socialnetwork.kyrqrkj.mongodb.net/socialnetwork?retryWrites=true&w=majority&appName=socialnetwork"

const app = express()

app.use(cookieParser());
app.use(express.json());
app.use("/accounts", userRoutes)
app.use("/post", postRouter)

mongoose.connect(db_url)
.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
})
.catch((error) => {
    console.error(error)
    console.log("An error occured, failed to connect to database")
})
