const bcrypt = require("bcrypt");
const Book = require("../models/bookmodel");
const jwt = require("jsonwebtoken");

//FUNCTION TO CHECK TOKEN
async function tokenCheck(req, res, next) {
    try {
        const secretKey = process.env.JWTPASSWORD; 
        const token = req.header("Authorization").replace("Bearer ", ""); 
        const decodedToken = jwt.verify(token, secretKey);
        console.log(decodedToken);

        const addBook = decodedToken.book; 
        const addResponse = await Book.create(addBook);

        if(!addResponse) {
            throw new Error("unable to add book") 
        } else {
            req.body.book = addBook
            next();
        }
    } catch (error) {
        res.status(500).json({
            errormessage : error.message
        })
        console.log(error)
    }
}

module.exports = {
    tokenCheck
}