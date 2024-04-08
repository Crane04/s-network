const mongoose = require("mongoose")

const PostSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        minLength: [1, "Post must have at least 1 character"],
        required: [true, "Content is required"]
    }
})

const Post= mongoose.model("Post", PostSchema)

module.exports = Post