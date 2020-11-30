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
          viewAllEmployeesDepartment();
          break;
        case "View All Employees By Manager":
          viewAllEmployeesMgr();
          break;
        case "Add Employee":
          addEmployees();
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
  connection.query(
    "SELECT concat(first_name,' ', last_name) as EmpName,t2.title,t3.name as Department FROM employeetracker.employee as t1	join employeetracker.role as t2 on t1.role_id=t2.id  join employeetracker.department as t3 on t2.department_ID=t3.id order by t3.name;",
    function (err, results) {
      if (err) throw err;
      console.log(
        chalk.bgGreen(
          "------------------------All Employees------------------------"
        )
      );
      console.table(results);
      start();
    }
  );
}
///view all employees by Department function
function viewAllEmployeesDepartment() {
  connection.query(
    "SELECT t3.name as Department,concat(first_name,' ', last_name) as EmpName FROM employeetracker.employee as t1	join employeetracker.role as t2 on t1.role_id=t2.id  join employeetracker.department as t3 on t2.department_ID=t3.id order by t3.name;",
    function (err, results) {
      if (err) throw err;
      console.log(
        chalk.bgBlueBright(
          "------------------------Employees by Department------------------------"
        )
      );
      console.table(results);
      start();
    }
  );
}
///view all employees by Manager function
function viewAllEmployeesMgr() {
  connection.query(
    "SELECT  concat(t2.first_name,' ',t2.last_name) as MgrName ,concat(t1.first_name,' ',t1.last_name) as EmpName FROM employeetracker.employee as t1 join employeetracker.employee as t2 on t1.manager_id=t2.role_id;",
    function (err, results) {
      if (err) throw err;
      console.log(
        chalk.bgCyanBright(
          "------------------------Employees by Manager------------------------"
        )
      );
      console.table(results);
      start();
    }
  );
}

function addEmployees() {
  connection.query(
    "SELECT id,title FROM employeetracker.role;",
    function (err, results) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "empFirstName",
            type: "input",
            message: "Employee First Name?",
          },
          {
            name: "empLastName",
            type: "input",
            message: "Employee LastName Name?",
          },
          {
            name: "role",
            type: "list",
            message: "Choose Role for New Employee",
            choices: function () {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].title);
              }

              return choiceArray;
            },
          },
        ])
        .then(function (answer) {
          //code for after the inquire prompts
          console.log(answer.role);
          connection.query(
            `SELECT min(id) as id FROM employeetracker.role where title = ${JSON.stringify(
              answer.role
            )};`,
            function (err, results) {
              if (err) throw err;
              console.log(results[0].id);
            }
          );
        });
    }
  );
  ///
}

function start() {
  //welcomeScreen();
  questions();
}
