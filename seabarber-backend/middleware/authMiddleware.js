const jwt = require('jsonwebtoken')

const accessValidation = (req, res, next) => {
    const { authorization } = req.headers

    if(!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Token Needed or Invalid Format" })
    }

    const token = authorization.split(' ')[1]
    const secret = process.env.JWT_SECRET
    
    try{
        const jwtDecode = jwt.verify(token, secret)
        req.userData = jwtDecode
        next()
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token Expired" })
        } 
        else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid Token" })
        }
        return res.status(401).json({ message: "Unauthorized" })
    }
}

module.exports = accessValidation