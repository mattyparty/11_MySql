const inquirer = require("inquirer");
const table = require("console-table-printer");

module.exports = {
  addDept: function (connection, start) {
    inquirer
      .prompt([
        {
          name: "dept_name",
          type: "input",
          message: "What is the department name?",
        },
      ])
      .then((response) => {
        connection.query("INSERT INTO department SET ?", {
          name: response.dept_name,
        });
      })
      .then(() => console.log("--------------------------------------"))
      .then(() => console.log("Department Added!"))
      .then(() => console.log("--------------------------------------"))
      .then(() => start());
  },

  addRole: function (connection, start) {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "Provide name of the role?",
        },
        {
          name: "salary",
          type: "input",
          message: "Provide salary for this role?",
        },
      ])
      .then((response) => {
        connection.query("INSERT INTO role SET ?", {
          title: response.title,
          salary: response.salary,
          department_id: response.dept_id,
        });
      })
      .then(() => console.log("--------------------------------------"))
      .then(() => console.log("Role Added!"))
      .then(() => console.log("--------------------------------------"))
      .then(() => start());
  },

  addEmployee: function (connection, start) {
    connection.query("SELECT * FROM role", function (err, roleData) {
      connection.query("SELECT * FROM employee", function (err, employeeData) {
        var allRoles = roleData.map((role) => role.title);
        var allManagers = employeeData.map(
          (manager) => manager.first_name + " " + manager.last_name
        );

        inquirer
          .prompt([
            {
              name: "first_name",
              type: "input",
              message: "What is the employee's first name?",
            },
            {
              name: "last_name",
              type: "input",
              message: "What is the employee's last name?",
            },
            {
              name: "title",
              type: "list",
              message: "Choose the employee's title",
              choices: allRoles,
            },
            {
              name: "manager",
              type: "list",
              message: "Choose the employee's manager",
              choices: allManagers,
            },
          ])
          .then((response) => {
            var roleObj = roleData.find(
              (role) => role.title === response.title
            );
            var employeeObj = employeeData.find(
              (employees) =>
                employees.first_name + " " + employees.last_name ===
                response.manager
            );

            connection.query(
              "INSERT INTO employee SET ?",
              {
                first_name: response.first_name,
                last_name: response.last_name,
                role_id: roleObj.id,
                manager_id: employeeObj.id,
              },
              function (err) {
                if (err) throw err;
                console.log("--------------------------------------");
                console.log("Employee Added!");
                console.log("--------------------------------------");
                start();
              }
            );
          });
      });
    });
  },
};
