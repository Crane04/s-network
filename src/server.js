const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser')
const userRoutes = require("./routes/userRoutes")
require('dotenv').config();
const port = process.env.PORT || 3000
const db_url = process.env.DB_URL

const app = express()

app.use(cookieParser());
app.use(express.json());
app.use("/accounts", userRoutes)

mongoose.connect(db_url)
.then(() => {
    app.listen(port, () => {
        console.log("Server is running on port 3000")
    })
})
.catch((error) => {
    console.error(error)
    console.log("An error occured, failed to connect to database")
})
