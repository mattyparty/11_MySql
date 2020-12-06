const inquirer = require("inquirer");
const table = require("console-table-printer");

module.exports = {
  updateEmployeeRole: function (connection, start) {
    connection.query("SELECT * FROM employee", function (err, employeeData) {
      connection.query("SELECT * FROM role", function (err, roleData) {
        var allEmployees = employeeData.map(
          (employee) => employee.first_name + " " + employee.last_name
        );
        var allRoles = roleData.map((role) => role.title);

        inquirer
          .prompt([
            {
              name: "employee",
              type: "list",
              message: "Select an employee to update?",
              choices: allEmployees,
            },
            {
              name: "title",
              type: "list",
              message: "Select the employee's new role?",
              choices: allRoles,
            },
          ])
          .then((response) => {
            var employeeObj = employeeData.find(
              (employee) =>
                employee.first_name + " " + employee.last_name ===
                response.employee
            );
            var roleObj = roleData.find(
              (role) => role.title === response.title
            );

            connection.query(
              "UPDATE employee SET role_id = ? WHERE id = ?",
              [roleObj.id, employeeObj.id],
              function (err) {
                if (err) throw err;
                console.log(
                  "---------------------------------------------------"
                );
                console.log(
                  chalk.white.bgBlueBright.bold("Employee Role Updated!")
                );
                console.log(
                  "---------------------------------------------------"
                );
                start();
              }
            );
          });
      });
    });
  },

  updateEmployeeMgr: function (connection, start) {
    connection.query("SELECT * FROM employee", function (err, employeeData) {
      var allEmployees = employeeData.map(
        (employee) => employee.first_name + " " + employee.last_name
      );
      var allManagers = employeeData.map(
        (manager) => manager.first_name + " " + manager.last_name
      );

      inquirer
        .prompt([
          {
            name: "employee",
            type: "list",
            message: "Select an employee to update?",
            choices: allEmployees,
          },
          {
            name: "manager",
            type: "list",
            message: "Select the employee's new manager",
            choices: allManagers,
          },
        ])
        .then((response) => {
          var employeeObj = employeeData.find(
            (employee) =>
              employee.first_name + " " + employee.last_name ===
              response.employee
          );
          var managerObj = employeeData.find(
            (employee) =>
              employee.first_name + " " + employee.last_name ===
              response.manager
          );

          connection.query(
            "UPDATE employee SET manager_id = ? WHERE id = ?",
            [managerObj.id, employeeObj.id],
            function (err) {
              if (err) throw err;
              console.log(
                "---------------------------------------------------"
              );
              console.log(
                chalk.white.bgBlueBright.bold("Employee Manager Updated!")
              );
              console.log(
                "---------------------------------------------------"
              );
              start();
            }
          );
        });
    });
  },
};
