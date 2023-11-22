const { DataTypes } = require("sequelize");
const SQLconnection = require("../db/connection");

const User = SQLconnection.define("User", {
    userID : {
        type : DataTypes.INTEGER,
        allowNull : true
    },
    email : {
        type : DataTypes.STRING,
        unique : true,
        allowNull : false,
        validate: {
            isEmail : true
        }
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
    },
});

module.exports = User;