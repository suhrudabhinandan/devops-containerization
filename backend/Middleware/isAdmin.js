const isAdmin = (req, res, next) => {
    // console.log("i am inside isAdmin middleWare");
    if (req.user.position && req.user.position.toLowerCase() === "Adminstrator") {
        next();
    } else {
        res.status(403).json({
            success: false,
            msg: "Access Denied: This route is only for Admins"
        });
    }
}

module.exports = isAdmin;