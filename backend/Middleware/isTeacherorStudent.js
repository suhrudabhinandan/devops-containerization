const isTeacherorStudent = (req, res, next) => {
  if (req.user?.position === "teacher" || req.user?.position === "student") {
    next();
  } else {
    return res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = isTeacherorStudent