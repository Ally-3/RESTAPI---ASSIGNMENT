const express = require("express");
const userRouter = express.Router();

const { hashPassword, comparePassword, tokenCheck } = require("../middleware/index");
const { register, login, listAllUsers, booksLinkedToUser } = require("../controllers/usercontroller");

userRouter.post("/registerUser", hashPassword, register);
userRouter.post("/loginUser", comparePassword, login);

//READ BOOKS - list all books
userRouter.get("/listAllUsers", listAllUsers);

//USERS LINKED TO BOOKS
userRouter.get("/booksLinkedToUser", tokenCheck, booksLinkedToUser);

module.exports = userRouter;