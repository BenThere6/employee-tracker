const pool = require('../tools/db');
const util = require('util');

// SQL statements to create database tables if they do not exist
const createDepartmentTableSQL = `
  CREATE TABLE IF NOT EXISTS department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  );
`;

const createRoleTableSQL = `
  CREATE TABLE IF NOT EXISTS role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
  );
`;

const createEmployeeTableSQL = `
  CREATE TABLE IF NOT EXISTS employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
  );
`;

// Promisify the pool.query function for easier use with async/await
const query = util.promisify(pool.query).bind(pool);

// Create database tables if they do not exist.
async function createTablesIfNotExist() {
  try {
    // Execute the SQL statements to create tables
    await query(createDepartmentTableSQL);
    await query(createRoleTableSQL);
    await query(createEmployeeTableSQL);
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

module.exports = { createTablesIfNotExist };
