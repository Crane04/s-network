const jwt = require("jsonwebtoken")

const ValidateUser = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization
    
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1]

        jwt.verify(token, "MY App", (err, decoded) => {
            if(err){
                return res.status(401).json({
                    "detail": "User is unauthenticated!"
                })
            }
            req.user = decoded.user
            next()
        })
    }
    if(!token){
        res.status(401).json({
            "message": "Missing token"
        })
    }
}

module.exports = ValidateUser