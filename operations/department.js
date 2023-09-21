const pool = require('../tools/db');

function getAllDepartments() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      
      // Query the 'department' table to select all departments.
      connection.query('SELECT * FROM department', (queryError, results) => {
        connection.release();
        
        if (queryError) {
          return reject(queryError);
        }
        
        // Resolve with the retrieved departments.
        resolve(results);
      });
    });
  });
}

function addDepartment(name) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      
      // Insert a new department with the provided name into the 'department' table.
      connection.query('INSERT INTO department (name) VALUES (?)', [name], (queryError, results) => {
        connection.release();
        
        if (queryError) {
          return reject(queryError);
        }
        
        // Resolve with the result of the insert operation.
        resolve(results);
      });
    });
  });
}

module.exports = {
  getAllDepartments,
  addDepartment,
};
