const Teacher = require('../models/Teacher');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.teacherSignUp = async (req, res) => {
    try{
        const { instituteId, name,password, subject, contactNumber } = req.body;
        const existingTeacher = await Teacher.findOne({where : {name}});
        if(existingTeacher){
            return res.status(400).json({
                msg: "Teacher already exists",
                existingTeacher
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newTeacher = await Teacher.create({
            instituteId,
            name,
            password: hashedPassword,
            subject,
            contactNumber   
        })
        res.status(201).json({
            msg: "Teacher created successfully",
            newTeacher
        })
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.teacherLogin = async (req, res) => {
    try{
        const {name, password} = req.body;
        const teacher = await Teacher.findOne({where: {name}});
        if(!teacher){
            return res.status(400).json({
                msg: "Teacher does not exist"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, teacher.password);
        if(!isPasswordValid){
            return res.status(400).json({
                msg: "Invalid credentials"
            })
        }
    
        const token = jwt.sign({id: teacher.id, name: teacher.name, position: teacher.position, instituteId: teacher.instituteId, }, 'your_jwt_secret', {expiresIn: '1d'});
        res.status(200).json({
            msg: "Login successful",
            token,
            teacher
        })
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

