const express = require("express");
const userRouter = express.Router();

const { hashPassword, comparePassword, tokenCheck } = require("../middleware/index");
const { register, login, booksLinkedToUser } = require("../controllers/usercontroller");

userRouter.post("/registerUser", hashPassword, register);
userRouter.post("/loginUser", comparePassword, login);
userRouter.get("/booksLinkedToUser", tokenCheck, booksLinkedToUser);

module.exports = userRouter;