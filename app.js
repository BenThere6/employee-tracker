const inquirer = require('inquirer');
const department = require('./operations/department');
const role = require('./operations/role');
const employee = require('./operations/employee');

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
                    break;
                case 'View roles':
                    break;
                case 'View employees':
                    break;
                case 'Add department':
                    break;
                case 'Add role':
                    break;
                case 'Add employee':
                    break;
                case 'Update employee role':
                    break;
                case 'Exit':
                    console.log('Goodbye!');
                    process.exit();
                default:
                    console.log('Invalid action. Please try again.');
                    startApp();
            }
        })
}

startApp();