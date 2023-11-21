require("dotenv").config();
const express = require("express");
const app = express();

const User = require("../src/models/usermodel");
const userRouter = require("../src/routes/userroutes");

const Book = require("../src/models/bookmodel");
const bookRouter = require("../src/routes/bookroutes");

function syncTables() {
    User.sync({ alter : true })
    Book.sync({ alter : true })
}

const port = process.env.PORT || 5002

app.use(express.json());
app.use(userRouter, bookRouter);

app.get("/health", (req, res) => {
    res.status(200).json({message: "API is running"})
})

app.listen (port, () => {
    console.log(`app is listening on ${port}`);
    syncTables();
})