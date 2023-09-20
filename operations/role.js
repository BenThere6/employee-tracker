const pool = require('../tools/db');

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

function addRole(name, salary, departmentId) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      
      const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
      const values = [name, salary, departmentId];
      
      connection.query(sql, values, (queryError, results) => {
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