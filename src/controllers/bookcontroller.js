const Book = require("../models/bookmodel");
const jwt = require("jsonwebtoken");

//1. CREATE BOOK - POST - adds a book to the DB
async function addBook(req, res) {
    try {
        const bookResponse = await Book.create(req.body);
        const expirationTime = 1000*60*60*24*7
        const privateKey = process.env.JWTPASSWORD
        const payload = {
            title : req.body.title,
            author : req.body.author,
            publisher : req.body.publisher,
            genre : req.body.genre
        };
        const options = {
            expiresIn : expirationTime
        };
        const token = await jwt.sign(payload, privateKey, options);
        console.log(token);

        res.status(201).json({
            message : "book added to table",
            book : bookResponse,
            token : token
        })

    } catch (error) {
        res.status(501).json({ 
            message: error.message, 
            error: error
        })
    }
}

module.exports = { 
    addBook
};