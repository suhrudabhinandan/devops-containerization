const jwt = require('jsonwebtoken');

const verification = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
       
        if (!authHeader) {
            return res.status(401).json({ msg: "Authorization header missing!❌" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ msg: "Invalid token!❌" });
        }

        const decoded = jwt.verify(token, "your_jwt_secret"); 
        req.user = decoded;
       
        
        next();

    } catch (err) {
        return res.status(401).json({ message: "Unauthorized access", err });
    }
};

module.exports = verification;
