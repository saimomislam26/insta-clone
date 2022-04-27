const jwt = require('jsonwebtoken');
const { User } = require('../model/user');

const authenticate = async (req, res, next) => {
    //Using CookiesJWT Token

    // const token = req.cookies.jwtooken;
    // console.log(token);
    // if (!token) return res.status(403).json({ message: "Access Denied!!" })
    // try {

    //     //all user info from database will be saved of this verified token
    //     const decoded = jwt.verify(token, process.env.SECRET_KEY);
    //     const rootUser = await User.findOne({ _id: decoded._id, "tokens.token": token })
    //     if (!rootUser) return res.status(400).send("User Not Found")
    //     req.token = token;
    //     req.rootUser = rootUser;
    //     req.userId = rootUser._id
    //     next();
    // } catch (err) {
    //     res.status(401).json({ message: "unathorized!No token Provided" })
    // }

    // Using request header Bearer

    const {authorization} = req.headers
    // console.log(authorization);
    //authorization === Bearer ewefwegwrherhe
    if(!authorization){
       return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    // console.log(token);

    try {

        //all user info from database will be saved of this verified token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({ _id: decoded._id, "tokens.token": token })
        if (!rootUser) return res.status(400).send("User Not Found")
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: "unathorized!No token Provided" })
    }

}
module.exports = authenticate;