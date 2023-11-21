const { Router } = require("express");
const bookRouter = Router();

const { tokenCheck } = require("../middleware/index");
const { addBook } = require("../controllers/bookcontroller");

//CREATE BOOK - adds book to database
bookRouter.post("/addbook", tokenCheck, addBook);

//EXPORT
module.exports = bookRouter;