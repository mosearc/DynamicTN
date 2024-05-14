const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1]; //token meglio passarlo nell'hearder

        console.log(token);
        const decoded = jwt.verify(token, "secret"); //v16 per token nel body
        req.userData = decoded;
        next()
    } catch (error){
        return res.status(401).json({
            message: 'Authentication failed',
        });
    }
}