const table = require("console-table-printer");
const chalk = require("chalk");

// view functions

module.exports = {
  viewAllDept: function (connection, start) {
    connection.query(
      "SELECT name as Departments FROM department;",
      function (err, data) {
        console.log(
          chalk.white.bgBlueBright.bold(
            "----------------View All Departments---------------"
          )
        );
        table.printTable(data);
        console.log("---------------------------------------------------");
        start();
      }
    );
  },

  viewAllRoles: function (connection, start) {
    connection.query(
      `SELECT distinct title as Roles FROM role order by title;`,
      function (err, data) {
        console.log("-----------------View All Roles--------------------");
        table.printTable(data);
        console.log("---------------------------------------------------");
        start();
      }
    );
  },

  viewAllEmployees: function (connection, start) {
    connection.query(
      `SELECT concat(first_name,' ',last_name) as EmployeeName FROM employee;`,
      function (err, data) {
        console.log("--------------View All Employees--------------------");
        table.printTable(data);
        console.log("---------------------------------------------------");
        start();
      }
    );
  },

  //view employees by manager
  viewEmployeesByMgr: function (connection, start) {
    connection.query(
      `SELECT 
        concat(t2.first_name,' ',t2.last_name) as MgrName 
        ,concat(t1.first_name,' ',t1.last_name) as EmpName
        FROM employeetracker.employee as t1
            left join employeetracker.employee as t2
        on t1.manager_id = t2.id
        where t1.manager_id<>t1.id
        order by t2.first_name`,
      function (err, data) {
        console.log("--------------Employees By Manager-----------------");
        table.printTable(data);
        console.log("---------------------------------------------------");
        start();
      }
    );
  },

  viewTotalBudgetByDept: function (connection, start) {
    connection.query(
      `SELECT 
        t3.name as Department
       ,sum(t2.salary) as Salary  
      FROM employeetracker.employee as t1
        join employeetracker.role as t2 
            on t1.role_id=t2.id
        join employeetracker.department as t3 
            on t2.department_id=t3.id
        group by t3.name
        union all
        SELECT 
        'Total' as Department
        ,sum(t2.salary) as Salary  
        FROM employeetracker.employee as t1
        join employeetracker.role as t2 
            on t1.role_id=t2.id
        join employeetracker.department as t3 
            on t2.department_id=t3.id`,
      function (err, data) {
        console.log("--------------Total Budget By Dept-----------------");
        table.printTable(data);
        console.log("---------------------------------------------------");
        start();
      }
    );
  },
};
