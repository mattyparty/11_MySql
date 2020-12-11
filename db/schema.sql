DROP DATABASE IF EXISTS employeetracker;

CREATE DATABASE employeetracker;

USE employeetracker;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
 first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id int,
  manager_id int,
  PRIMARY KEY (id)
);

USE employeetracker; 

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
	PRIMARY KEY (id)
);


USE employeetracker; 

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary decimal,
 department_id int,
   PRIMARY KEY (id)
);
