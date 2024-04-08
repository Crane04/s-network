const express = require("express")
const router = express.Router()
const { signupUser, signinUser, currentUser } = require("../controllers/auth.controllers")
const ValidateUser = require("../middleware/validateHandlerToken")


router.post("/signup", signupUser)
router.post("/signin", signinUser)
router.get("/user", ValidateUser, currentUser)

module.exports = router