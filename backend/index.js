require("dotenv").config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;


// Connect to MySQL database
const mysqlConn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1qazxsw2",
    database: "demo"
});

console.log("Server port is configured to " + PORT)

// Get all employees
app.get("/employees", (req, res) => {
    const sql = "SELECT * FROM employees WHERE status = 1"
    mysqlConn.query(sql, (err, data) => {
        if (err) {
            console.log(err);            
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            console.log("get all employees" + data)
            res.json(data);
        }
    });
});

// Get employee by id
app.get("/employees/:id", (req, res) => {
    const sql = "SELECT * FROM employees WHERE id = ?"
    const id = req.params.id
    mysqlConn.query(sql, id,(err, data) => {
        if (err) {
            console.log(err);            
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            console.log("get employee by id" + data[0].firstName)
            res.json(data);
        }
    });
});

// Add new employee
app.post("/employees", (req, res) => {    
    const sql = 'INSERT INTO employees (firstName, lastName, email, phone) VALUES (?,?,?,?)'
    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.phone    
    ]
    mysqlConn.query(sql, values, (err, data) => {
        if (err) {
            console.log(sql, values);
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            console.log("Employee added successfully. Inserted ID: " + data.insertId)
            res.json("Employee added successfully");
        }
    });

});

// Update new employee
app.put("/employees/:id", (req, res) => {    
    const sql = 'UPDATE employees SET firstName=?, lastName=?, email=?, phone=? WHERE id=?'
    const id = req.params.id
    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.phone,
        id
    ]
    mysqlConn.query(sql, values, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            console.log("Employee edited successfully")
            res.json("Employee edited successfully");
        }
    });

});

// Delete new employee
app.delete("/employees/:id", (req, res) => {
    // hard/pysical deletion
    // const sql = 'Delete FROM employees WHERE id=?'

    // soft/logical deletion
    const sql = 'UPDATE employees SET status=0 WHERE id=?'
    const id = req.params.id
    mysqlConn.query(sql, id, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            console.log("Employee deleted successfully")
            res.json("Employee deleted successfully");
        }
    });

});



app.get("/", (req, res) => {
    res.json("Hello from the Node.js server!")
});

const server = app.listen(PORT, () => {
  console.log("Server is running on port " + server.address().port);
});

