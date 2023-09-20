const pool = require('../tools/db');

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

async function createTablesIfNotExist() {
  try {
    const connection = await pool.getConnection();
    
    await connection.promise().query(createDepartmentTableSQL);
    await connection.promise().query(createRoleTableSQL);
    await connection.promise().query(createEmployeeTableSQL);

    connection.release();
    
    console.log('Tables created successfully (if they did not exist).');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

module.exports = { createTablesIfNotExist };
