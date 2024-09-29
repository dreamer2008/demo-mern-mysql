require("dotenv").config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const sequelize = require("./config/database");
const EmployeeModel = require("./models/EmployeeModel");


const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT  || 5000;

// Connect with Sequelize
sequelize.authenticate().then(() => {
    console.log("Connection with sequelize has been established successfully.");
}).catch((error) => {
    console.error("Unable to connect with sequelize to the database:", error);
});

sequelize.sync({ force: false});

app.use('/employees', require('./routes/EmployeeRoute'))


app.get("/", (req, res) => {
    res.json("Hello from the Node.js server!")
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

