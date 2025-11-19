const express = require('express');
const router = express.Router();
const Usercontroller = require('../controller/user-controller');


//Signup 
router.post('/signUp', Usercontroller.signUp);

//Login
router.post('/Login', Usercontroller.Login);



//Get all users
router.get('/allUser', async(req, res) =>{

    const {username} = req.params;
     if (!username) { 
            return res.status(400).json({ msg: "Username is required" });
        }

    const user = await User.findOne({where: {username}});
    try {
        if(!user){
        return res.status(404).json({
            msg: "User not found! "
        })
    } else{
        res.status(200).json({
            msg : "User fetched successfully",
            user
        })
    }
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
});






module.exports = router;
