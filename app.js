const inquirer = require('inquirer');
const department = require('./operations/department');
const role = require('./operations/role');
const employee = require('./operations/employee');
const table = require('./tools/table');

function startApp() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Choose an action:',
                choices: [
                    'View employees',
                    'Add employee',
                    'Update employee role',
                    'View roles',
                    'Add role',
                    'View departments',
                    'Add department',
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
                        table.display(departments)
                    } catch (error) {
                        console.error('Error:', error);
                    }
                    startApp();
                    break;
                case 'View roles':
                    try {
                        const roles = await role.getAllRoles();
                        console.log('Roles:');
                        table.display(roles);
                    } catch (error) {
                        console.error('Error:', error);
                    }
                    startApp();
                    break;
                case 'View employees':
                    try {
                        const employees = await employee.getAllEmployees();
                        console.log('Employees:');
                        table.display(employees);
                    } catch (error) {
                        console.error('Error:', error);
                    }
                    startApp();
                    break;
                case 'Add department':
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'departmentName',
                            message: 'Enter the name of the new department:',
                            validate: (input) => {
                                if (input.trim() === '') {
                                    return 'Department name cannot be empty.';
                                }
                                return true;
                            }
                        }
                    ]).then(async (answers) => {
                        try {
                            const departmentName = answers.departmentName;
                            await department.addDepartment(departmentName);
                            console.log(`Department '${departmentName}' added successfully.`);
                        } catch (error) {
                            console.error('Error:', error);
                        }
                        startApp();
                    });
                    break;
                    case 'Add role':
                        department.getAllDepartments()
                            .then((departments) => {
                                const departmentChoices = departments.map((dept) => dept.name);
                                
                                inquirer.prompt([
                                    {
                                        type: 'input',
                                        name: 'roleName',
                                        message: 'Enter the name of the new role:',
                                        validate: (input) => {
                                            if (input.trim() === '') {
                                                return 'Role name cannot be empty.';
                                            }
                                            return true;
                                        }
                                    },
                                    {
                                        type: 'input',
                                        name: 'salary',
                                        message: 'Enter the salary:',
                                        validate: (input) => {
                                            if (input.trim() === '') {
                                                return 'Salary cannot be empty.';
                                            }
                                            return true;
                                        }
                                    },
                                    {
                                        type: 'list',
                                        name: 'dept',
                                        message: 'Which department does the role belong to?',
                                        choices: departmentChoices 
                                    }
                                ]).then(async (answers) => {
                                    try {
                                        const roleName = answers.roleName;
                                        const salary = answers.salary;
                                        const departmentName = answers.dept;
                                        
                                        const selectedDepartment = departments.find((dept) => dept.name === departmentName);
                                        const departmentId = selectedDepartment ? selectedDepartment.id : null;
                                        
                                        await role.addRole(roleName, salary, departmentId);
                                        
                                        console.log(`Role '${roleName}' added successfully.`);
                                    } catch (error) {
                                        console.error('Error:', error);
                                    }
                                    startApp();
                                });
                            })
                            .catch((error) => {
                                console.error('Error fetching departments:', error);
                                startApp();
                            });
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