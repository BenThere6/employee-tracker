const pool = require('../tools/db');

function getAllEmployees() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      
      const query = `
        SELECT e.id, e.first_name, e.last_name, r.title AS role, r.salary, 
                d.name AS department, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        LEFT JOIN role r ON e.role_id = r.id
        LEFT JOIN department d ON r.department_id = d.id
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

function addEmployee(firstName, lastName, roleId, managerId) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err);
      }
      
      const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
      const values = [firstName, lastName, roleId, managerId];
      
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

function updateEmployeeRole(employeeId, newRoleId) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        
        const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
        const values = [newRoleId, employeeId];
        
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
  getAllEmployees,
  addEmployee,
  updateEmployeeRole
};