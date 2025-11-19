const isStudent = (req, res, next) => {
    // console.log("i am inside isStudent middleWare");
    if (req.user.position && req.user.position.toLowerCase() === "student") {
        next();
    } else {
        res.status(403).json({
            success: false,
            msg: "Access Denied: This route is only for Students"
        });
    }
}

module.exports = isStudent;