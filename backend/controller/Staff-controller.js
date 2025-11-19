const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Staff = require('../models/Staff');
const tokenVerification = require('../Middleware/token-verification');
const isAdmin = require('../Middleware/isAdmin');


exports.staffLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
         const user = await Staff.findOne({ where: { name : username} });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Invalid password" });
        }
        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        
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

// Addning Staff
exports.addStaff = async (req, res) => {
    try {
        const { name, password, position, institute_id, contactNumber } = req.body;
        const existingStaff = await Staff.findOne({where: {name}});
        if(existingStaff){
            return res.status(400).json({
                msg: "Staff already exists",
                existingStaff
            })
        }   
        const hashedPassword = await bcrypt.hash(password, 10);
        const newStaff = await Staff.create({
            name,
            password: hashedPassword,
            position,
            institute_id,
            contactNumber
        });
        res.status(201).json({
            msg: "Staff created successfully✅........",
            newStaff
        })
    } catch (error) {
        console.error("Staff Creation Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
 