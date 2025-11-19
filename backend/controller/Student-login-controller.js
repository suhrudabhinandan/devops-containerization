const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Student = require('../models/Student');

exports.LoginController = async (req, res) => {
    try {
        const { name, password } = req.body;
        
        if (!name || !password) {
            return res.status(400).json({ msg: "Username and password are required" });
        }
        const user = await Student.findOne({ where: { name } });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ msg: "Invalid password" });
        }
        const token = jwt.sign({ id: user.student_id, name: user.name, institute_id: user.institute_id, position: user.position }, 'your_jwt_secret', { expiresIn: '1h' });
        
        
        res.status(200).json({
            msg: "Login successful",
            token,
            user
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};