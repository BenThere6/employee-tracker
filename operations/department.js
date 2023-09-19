const db = require('../db');

async function getAllDepartments() {
    const [rows] = await db.query('SELECT * FROM department')
    return rows
}

async function addDepartment(name) {
    await db.query('INSERT INTO department (name) VALUES (?)', [name]);
}

module.exports = {
    getAllDepartments,
    addDepartment
}