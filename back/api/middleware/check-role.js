const User = require("../models/user");



module.exports = (req, res, next) => {

    User.findOne({email: req.userData.email})
        .select('role')
        .then( user => {
            const userRole = user.role
            if(userRole == process.env.ADMIN_KEY){
                next()
            }else{
                res.status(403).json({
                    message: 'you are not administrator ' + userRole
                })
            }
        })

}