const pool = require('../db');

function getAllRoles() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }

      const query = `
        SELECT role.id, role.title, role.salary, department.name AS department
        FROM role
        LEFT JOIN department ON role.department_id = department.id
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

function addRole(name) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      
      connection.query('INSERT INTO role (name) VALUES (?)', [name], (queryError, results) => {
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
  getAllRoles,
  addRole,
};