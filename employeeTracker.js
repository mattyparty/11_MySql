const mysql = require("mysql");
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");

var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "password",
  database: "employeetracker",
});

connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});
//Welcome Screen
const welcomeScreen = () => {
  figlet("Employee Tracking System", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  });
};

///inquirer prompts
function questions() {
  inquirer
    .prompt({
      name: "questionAsked",
      type: "list",
      message: "What Would You Like To Do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
      ],
    })
    .then(function (answer) {
      switch (answer.questionAsked) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View All Employees By Department":
          //viewAllEmployees()
          break;
        case "View All Employees By Manager":
          //viewAllEmployees()
          break;
        case "Add Employee":
          //viewAllEmployees()
          break;
        case "Remove Employee":
          //viewAllEmployees()
          break;
        case "Update Employee Role":
          //viewAllEmployees()
          break;
        case "Update Employee Manager":
        //viewAllEmployees()
      }
    });
}
///view all employees function

function viewAllEmployees() {
  ///
  connection.query(
    "SELECT first_name,last_name FROM employeetracker.employee",
    function (err, results) {
      if (err) throw err;
      console.table(results);
      start();
    }
  );
}
///////
function start() {
  welcomeScreen();
  //questions();
}
