const isTeacher = (req, res, next) => {
    // console.log("i am inside isTeacher middleWare");
    if (req.user.position && req.user.position.toLowerCase() === "teacher") {
        next();
    }   
    else {
        res.status(403).json({
            success: false,
            msg: "Access Denied: This route is only for Teachers"
        });
    }
}

module.exports = isTeacher;