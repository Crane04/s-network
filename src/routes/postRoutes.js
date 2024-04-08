const express = require("express")
const router = express.Router()
const { MakePost, GetPosts } = require("../controllers/post.controllers")
const ValidateUser = require("../middleware/validateHandlerToken")

router.post("/add", ValidateUser, MakePost)
router.get("/posts", GetPosts)

module.exports = router