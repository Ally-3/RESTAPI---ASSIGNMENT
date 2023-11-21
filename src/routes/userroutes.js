const { Router } = require("express");
const userRouter = Router();

const { register, login, listAllUsers } = require("../controllers/usercontroller")

userRouter.post("/registerUser", register);
userRouter.post("/loginUser", login);

userRouter.get("/listAllUsers", listAllUsers);

module.exports = userRouter;