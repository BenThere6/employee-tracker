const pool = require('../db');

function getAllEmployees() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      
      const query = `
        SELECT e.id, e.first_name, e.last_name, r.title AS role, 
               CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        LEFT JOIN role r ON e.role_id = r.id
        LEFT JOIN employee m ON e.manager_id = m.id
      `;

      connection.query(query, (queryError, results) => {
        connection.release();
        
        if (queryError) {
          return reject(queryError);
        }
        
        resolve(results);
      });
    });
  });
}

function addEmployee(name) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      
      connection.query('INSERT INTO employee (name) VALUES (?)', [name], (queryError, results) => {
        connection.release();
        
        if (queryError) {
          return reject(queryError);
        }
        
        resolve(results);
      });
    });
  });
}

module.exports = {
  getAllEmployees,
  addEmployee,
};