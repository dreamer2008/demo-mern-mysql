const express = require('express');

const EmployeeRoute = express.Router()

let EmployeeModel = require('../models/EmployeeModel');
const { where } = require('sequelize');

// Get all(only valid/active data)
EmployeeRoute.get('/', async (req, res) => {
    try {
        const employees = await EmployeeModel.findAll({where:{ status:1 } })
        console.log("get all employees", employees.map(item => item.dataValues))
        res.json(employees)
    } catch (error) {
        console.log('Error while fetching all employees', error)
    }
})

// Get by id
EmployeeRoute.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const employee = await EmployeeModel.findByPk(id)
        console.log("get employee by id=" + id, employee.dataValues)
        res.json(employee.dataValues);
    } catch (error) {
        console.log(`Error while fetching employee by id=${id}`, error)
    }
})


// Create
EmployeeRoute.post('/', async (req, res) => {
    try {
        const employee = await EmployeeModel.create(req.body)
        console.log("Employee created successfully", employee)
        res.status(201).json({ message: 'Employee created successfully' });
    } catch (error) {
        console.log('Error while creating employee', error)
    }
})

// Update by id
EmployeeRoute.put('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const employee = await EmployeeModel.findOne({ where: { id: id } })
        if (!employee) {
            return res.status(404).json({ message: `Employee not found, id=${id}` });
        }
        console.log("Employee before update", employee)
        const employeeUpdate = await EmployeeModel.update(req.body, { where: { id: id } })
        console.log('Employee after update', employeeUpdate)
        res.status(200).json({ message: 'Employee updated successfully' });
    } catch (error) {
        console.log(`Error while updating employee by id=${id}`, error)
    }
})


//Delete
EmployeeRoute.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const employee = await EmployeeModel.findOne({ where: { id: id } })
        if (!employee) {
            return res.status(404).json({ message: `Employee not found, id=${id}` });
        }
        await EmployeeModel.destroy({ where: { id: id } })
        console.log("Employee deleted successfully")
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.log(`Error while deleting employee by id=${id}`, error)
    }
})

module.exports = EmployeeRoute;