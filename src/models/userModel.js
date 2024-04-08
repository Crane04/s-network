const mongoose = require("mongoose")

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            unique: [true, "Username already exists"],
            required: [true, "Username is required"],
        },
        email: {
            type: String,
            unique: [true, "User with this email already exists"],
            required: [true, "Email must be provided"],
            lowercase: true,
            trim: true,
            // validate: {
            //     validator: function (v) {
            //       return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            //     },
            //     message: '{VALUE} is not a valid email!'
            // }
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)



const User = mongoose.model("User", UserSchema)

module.exports = User