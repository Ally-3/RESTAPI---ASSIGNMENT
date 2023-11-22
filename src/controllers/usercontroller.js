const User = require("../models/usermodel");
const Book = require("../models/bookmodel");
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

//GET - books linked to user, find a user by email and retrieve all books associated with that user
async function booksLinkedToUser (req, res){
    try {
        const findUser = req.body.email;
        const user = await User.findOne({
            where: { email: findUser }
        });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const books = await Book.findAll({
            where: { UserId: user.id }
        });
        
        res.status(200).json(books);
    
    } catch (error) {
        res.status(501).json({ 
            message: error.message, 
            error: error
        });
    }
}

module.exports = {
    register,
    login,
    booksLinkedToUser
}