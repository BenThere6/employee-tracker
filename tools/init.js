const pool = require('../db');

const createRoleTableSQL = `
  CREATE TABLE IF NOT EXISTS role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
  );
`;

const createDepartmentTableSQL = `
  CREATE TABLE IF NOT EXISTS department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
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

async function createTablesIfNotExist() {
  try {
    await pool.query(createDepartmentTableSQL);
    await pool.query(createRoleTableSQL);
    await pool.query(createEmployeeTableSQL);
    console.log('Tables created successfully (if they did not exist).');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

createTablesIfNotExist();