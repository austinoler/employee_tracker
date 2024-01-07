const inquirer = require('inquirer');
const {
  getAllDepartments,
  getAllRoles,
  getAllEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
} = require('./queries');

// Function to display main menu
const mainMenu = async () => {
  const choices = [
    'View All Departments',
    'View All Roles',
    'View All Employees',
    'Add Department',
    'Add Role',
    'Add Employee',
    'Update Employee Role',
    'Exit'
  ];

  const { action } = await inquirer.prompt({
    name: 'action',
    type: 'list',
    message: 'Select an action:',
    choices
  });

  switch (action) {
    case 'View All Departments':
      const departments = await getAllDepartments();
      console.table(departments);
      break;

    case 'View All Roles':
      const roles = await getAllRoles();
      console.table(roles);
      break;

    case 'View All Employees':
      const employees = await getAllEmployees();
      console.table(employees);
      break;

    case 'Add Department':
      const { departmentName } = await inquirer.prompt({
        name: 'departmentName',
        type: 'input',
        message: 'Enter the name of the new department:'
      });
      await addDepartment(departmentName);
      console.log('Department added successfully!');
      break;

    case 'Add Role':
      // Add logic for adding a role
      const roleDetails = await inquirer.prompt([
        // Include prompts for role details (title, salary, department)
      ]);
      await addRole(roleDetails.title, roleDetails.salary, roleDetails.departmentId);
      console.log('Role added successfully!');
      break;

    case 'Add Employee':
      // Add logic for adding an employee
      const employeeDetails = await inquirer.prompt([
        // Include prompts for employee details (first name, last name, role, manager)
      ]);
      await addEmployee(
        employeeDetails.firstName,
        employeeDetails.lastName,
        employeeDetails.roleId,
        employeeDetails.managerId
      );
      console.log('Employee added successfully!');
      break;

    case 'Update Employee Role':
      const employeesToUpdate = await getAllEmployees();
      const employeeChoices = employeesToUpdate.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }));

      const { employeeId, roleId } = await inquirer.prompt([
        {
          name: 'employeeId',
          type: 'list',
          message: 'Select an employee to update:',
          choices: employeeChoices
        },
        {
          name: 'roleId',
          type: 'input',
          message: 'Enter the new role ID:'
        }
      ]);

      await updateEmployeeRole(employeeId, roleId);
      console.log('Employee role updated successfully!');
      break;

    case 'Exit':
      process.exit();
      break;

    default:
      console.log('Invalid choice. Please try again.');
  }

  // Continue looping the main menu
  await mainMenu();
};

// Function to start the application
const startApp = async () => {
  console.log('Employee Tracker Application\n');
  await mainMenu();
};

// Start the application
startApp();
