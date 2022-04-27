const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const router = express.Router();
const app = express();
const  { User} = require('../model/user')
const auth = require('../Middleware/authorization')

app.use(cookieParser())

//User Signup 
const signUp = async(req,res) => {
    const {name,email,password,cpassword} =req.body

    //All fields must be filled checking
    //same email login checking
    //password and confirm password match checking
    if(!name||!email||!password||!cpassword) return res.status(400).json({message:"Fill all the fields"})

    var user = await User.findOne({email:email})
    if(user) return res.status(400).json({message:"User is already exist"})

    if(password!==cpassword) return res.status(400).json({message:"Password doesn't match"})

    //if all checking is ok then register the user to the database
    user = new User({name,email,password,cpassword})
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.cpassword = await bcrypt.hash(user.cpassword, salt);

    const confirmUser = await user.save()

    return res.status(200).send({
        data:_.pick(confirmUser,['name','email'])
    })
}

//user Login
const signIn = async (req,res)=>{
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: "fill the empty field" });
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ message: "This email is not registered" });
    const pass = await bcrypt.compare(req.body.password, user.password);
    if (!pass) return res.status(400).json({ message: "incorrect Password" });

    const token = user.generateJWT();

    res.cookie("jwtooken", token, {
        expires: new Date(Date.now() + 25892000000),
        // httpOnly: true
    });
    const result = await user.save();

    res.status(200).send({
        token: token,
        data: _.pick(result, ['name', 'email'])
    })

}

//Getting Authenticate login user info
const getAuthData = async(req,res)=>{
    // console.log(req.rootUser);
    return res.status(200).send(req.rootUser)
}

router.route('/userSignup')
    .post(signUp)
router.route('/userSignin')
    .post(signIn)
router.route('/protecteddata')
    .get(auth,getAuthData)
module.exports = router