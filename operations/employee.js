const db = require('../db');

async function getAllEmployees() {
    const [rows] = await db.query('SELECT * FROM employee')
    return rows
}

async function addEmployee(name) {
    await db.query('INSERT INTO employee (name) VALUES (?)', [name]);
}

module.exports = {
    getAllEmployees,
    addEmployee
}