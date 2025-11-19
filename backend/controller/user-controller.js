const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require('../models/userModel-demo');

exports.signUp=async (req, res) => {
    try {
        const { username, password, mob } = req.body;
        const existingUser = await User.findOne({ where: {username} });
        if (existingUser) {
            return res.status(400).json({
                msg: "User already exists:",
                existingUser
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hashedPassword,
            mob
        });

        res.status(201).json({
            msg: "User created successfully........",
            newUser
        })
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



exports.Login=async (req, res) => {
     try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({
                msg: "User does not exist"
            })
        }   
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                msg: "Invalid credentials"
            })
        }
        
        const token = jwt.sign({ id: user.id , position: user.position}, 'your_jwt_secret', { expiresIn: '1d' });
        
        

        res.status(200).json({
            msg: "Login successful",
            token,
            user
        })
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

