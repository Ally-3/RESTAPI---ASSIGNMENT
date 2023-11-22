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

// READ BOOKS - GET - gets all books 
async function listAllBooks (req, res){
    try {
        const listOfBooks = await Book.findAll();
        res.status(200).json(listOfBooks);
    } catch (error) {
        res.status(501).json({ 
            message: error.message, 
            error: error
        })
    }
}

// UPDATE PUBLISHER - PUT - updates a book's publisher 
async function updatePublisher(req, res){
    try {
        const updatepb = await Book.update(
            { publisher: req.body.newPublisher },
            { where: { title: req.body.title } }
        );

        res.status(201).json({
            message: "publisher updated",
            book: updatepb
        });
    } catch (error) {
        res.status(501).json({ 
            message: error.message, 
            error: error
        })
    }
}

// DELETE BOOK - DELETE - deletes a single book by title 
async function deleteBook(req, res){
    try {
        const del = await Book.destroy({ 
            where: { title: req.body.title }
        });

        res.status(200).json({
            message: "book deleted",
            book: del
        });
    } catch (error) {
        res.status(501).json({ 
            message: error.message, 
            error: error
        })
    }
}

module.exports = { 
    addBook,
    listAllBooks,
    updatePublisher,
    deleteBook
};