const inquirer = require('inquirer');
const department = require('./operations/department');
const role = require('./operations/role');
const employee = require('./operations/employee');
const table = require('./display_table');

function startApp() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Choose an action:',
                choices: [
                    'View departments',
                    'View roles',
                    'View employees',
                    'Add department',
                    'Add role',
                    'Add employee',
                    'Update employee role',
                    'Exit'
                ]
            }
        ])
        .then(async (answer) => {
            switch (answer.action) {
                case 'View departments':
                    try {
                        const departments = await department.getAllDepartments();
                        console.log('Departments:');
                        table.table(departments)
                    } catch (error) {
                        console.error('Error:', error);
                    }
                    startApp();
                    break;
                case 'View roles':
                    try {
                        const roles = await role.getAllRoles();
                        console.log('Roles:');
                        console.table(roles);
                    } catch (error) {
                        console.error('Error:', error);
                    }
                    startApp();
                    break;
                case 'View employees':
                    const employees = employee.getAllEmployees();
                    startApp();
                    break;
                case 'Add department':
                    startApp();
                    break;
                case 'Add role':
                    startApp();
                    break;
                case 'Add employee':
                    startApp();
                    break;
                case 'Update employee role':
                    startApp();
                    break;
                case 'Exit':
                    console.log('Goodbye!');
                    process.exit();
                default:
                    console.log('Invalid action. Please try again.');
                    startApp();
                    break;
            }
        })
}

startApp();