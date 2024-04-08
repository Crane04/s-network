const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
require('dotenv').config();
const secret_key = process.env.SECRET_KEY

exports.signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if all fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are compulsory!" });
        }

        // Check if user with the same username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword)

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        res.json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.signinUser = async (req, res) => {
    console.log(req.body)
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ message: "Invalid Credentials" });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(400).send({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({
            user:{ id: user._id, username: user.username, email:user.email }
        }, secret_key, { expiresIn: 86400 });

        // Set the token in a cookie (optional)
        res.cookie("jwt", token, { maxAge: 86400, httpOnly: true });

        res.status(200).send({
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            },
            message: "Login Successful",
            jwt: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
};

exports.currentUser = async(req, res) => {
    res.json( req.user)
}