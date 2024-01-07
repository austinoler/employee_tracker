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
      const departmentsForRoles = await getAllDepartments();
      const departmentChoicesForRoles = departmentsForRoles.map(department => ({
        name: department.name,
        value: department.id
      }));

      const { roleName, roleSalary, departmentId } = await inquirer.prompt([
        {
          name: 'roleName',
          type: 'input',
          message: 'Enter the name of the new role:'
        },
        {
          name: 'roleSalary',
          type: 'input',
          message: 'Enter the salary for the new role:'
        },
        {
          name: 'departmentId',
          type: 'list',
          message: 'Select the department for the new role:',
          choices: departmentChoicesForRoles
        }
      ]);

      await addRole(roleName, roleSalary, departmentId);
      console.log('Role added successfully!');
      break;

      case 'Add Employee':
        const rolesForEmployees = await getAllRoles();
        const roleChoicesForEmployees = rolesForEmployees.map(role => ({
          name: role.title,
          value: role.id
        }));
      
        const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
          {
            name: 'firstName',
            type: 'input',
            message: 'Enter the first name of the new employee:'
          },
          {
            name: 'lastName',
            type: 'input',
            message: 'Enter the last name of the new employee:'
          },
          {
            name: 'roleId',
            type: 'list',
            message: 'Select the role for the new employee:',
            choices: roleChoicesForEmployees
          },
          {
            name: 'managerId',
            type: 'input',
            message: 'Enter the manager ID for the new employee (if applicable):'
          }
        ]);
      
        await addEmployee(firstName, lastName, roleId, managerId);
        console.log('Employee added successfully!');
        break;

    case 'Update Employee Role':
      const employeesToUpdate = await getAllEmployees();
      const employeeChoices = employeesToUpdate.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }));

      const rolesForUpdate = await getAllRoles();
      const roleChoicesForUpdate = rolesForUpdate.map(role => ({
        name: role.title,
        value: role.id
      }));

      const { employeeIdForUpdate, roleIdForUpdate } = await inquirer.prompt([
        {
          name: 'employeeIdForUpdate',
          type: 'list',
          message: 'Select an employee to update:',
          choices: employeeChoices
        },
        {
          name: 'roleIdForUpdate',
          type: 'list',
          message: 'Select the new role for the employee:',
          choices: roleChoicesForUpdate
        }
      ]);

      await updateEmployeeRole(employeeIdForUpdate, roleIdForUpdate);
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
