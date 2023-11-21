const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");

//REGISTER
async function register(req, res) {
    try {
        const UserResponse = await User.create(req.body);
        const expirationTime = 1000*60*60*24*7
        const privateKey = process.env.JWTPASSWORD
        const payload = {
            email : req.body.email
        };
        const options = {
            expiresIn : expirationTime
        };
        const token = await jwt.sign(payload, privateKey, options);
        console.log(token);

        res.status(201).json({
            message : "user successfully added",
            details : UserResponse, 
            token : token
        })
        // const UserResponse = await User.create(req.body);
        // res.status(201).json({
        //     message : "user successfully added",
        //     details : UserResponse
        // })
    } catch (error) {
        res.status(500).json({
            message : "unable to register user", 
            errorMessage: error
        })
        console.log(error);
    }
}

// LOGIN
async function login(req, res) {
    try {
        res.status(201).json({
            message : "user logged in",
            user : req.body.email
        })
    } catch (error) {
        res.status(500).json({
            message : "unable to login user", 
            errorMessage: error
        })
        console.log(error);
    }
}

module.exports = {
    register,
    login
}