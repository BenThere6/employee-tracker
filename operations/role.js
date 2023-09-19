const db = require('../db');

async function getAllRoles() {
    const [rows] = await db.query('SELECT * FROM role')
    return rows
}

async function addRole(name) {
    await db.query('INSERT INTO role (name) VALUES (?)', [name]);
}

module.exports = {
    getAllRoles,
    addRole
}