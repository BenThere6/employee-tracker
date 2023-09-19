const pool = require('../db');

function getAllEmployees() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      
      connection.query('SELECT * FROM employee', (queryError, results) => {
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