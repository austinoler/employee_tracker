const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'local_host',
  user: 'austinoler',
  password: 'password',
  database: 'employee_tracker',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to execute a query
const executeQuery = async (query, values = []) => {
    const [rows] = await pool.promise().query(query, values);
    return rows;
  };
  
  // Function to get all departments
  const getAllDepartments = async () => {
    const query = 'SELECT * FROM department';
    return executeQuery(query);
  };
  
  // Function to get all roles
  const getAllRoles = async () => {
    const query = 'SELECT * FROM role';
    return executeQuery(query);
  };
  
  // Function to get all employees
  const getAllEmployees = async () => {
    const query = 'SELECT * FROM employee';
    return executeQuery(query);
  };
  
  // Function to add a department
  const addDepartment = async (name) => {
    const query = 'INSERT INTO department (name) VALUES (?)';
    return executeQuery(query, [name]);
  };
  
  // Function to add a role
  const addRole = async (title, salary, departmentId) => {
    const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    return executeQuery(query, [title, salary, departmentId]);
  };
  
  // Function to add an employee
  const addEmployee = async (firstName, lastName, roleId, managerId) => {
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    return executeQuery(query, [firstName, lastName, roleId, managerId]);
  };
  
  // Function to update an employee's role
  const updateEmployeeRole = async (employeeId, roleId) => {
    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
    return executeQuery(query, [roleId, employeeId]);
  };