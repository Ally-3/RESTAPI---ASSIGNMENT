const { Router } = require("express");
const bookRouter = Router();

const { tokenCheck } = require("../middleware/index");
const { addBook, listAllBooks, updatePublisher, deleteBook } = require("../controllers/bookcontroller");

//CREATE BOOK - adds book to database
bookRouter.post("/addbook", tokenCheck, addBook);

//READ BOOKS - list all books
bookRouter.get("/listallbooks", listAllBooks)

//UPDATE BOOK
bookRouter.put("/updatepublisher", updatePublisher)

// DELETE BOOK
bookRouter.delete("/deletebook", deleteBook)

//EXPORT
module.exports = bookRouter;