const Book = require("../models/bookmodel");
const jwt = require("jsonwebtoken");

//1. CREATE BOOK - POST - adds a book to the DB
async function addBook(req, res) {
    try {
        console.log(req.body);
        const bookResponse = await Book.create(req.body);

        res.status(201).json({
            message : "book added to table",
            book : bookResponse
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