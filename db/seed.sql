use employeeTracker;

truncate table department;

insert into department (name)
values ('Finance'),
('IT'),
('Supply Chain'),
('Program Managment'),
('Human Resources'),
('Production');

truncate table role;
use employeeTracker;
insert into employeeTracker.role (title,salary,department_ID)
values ('Vice President',150000,1),
('CFO',200000,1),
('Machinist',50000,6),
('HR Mgr',100000,5),
('Controller',100000,1),
('SCM Mgr',105000,3),
('Finance Mgr',150000,1),
('IT Mgr',160000,2),
('Buyer',100000,3),
('IT Tech',60000,2),
('Program Mgmt Mgr',70000,4),
('Customer Rep',69000,4),
('Machinist',50000,6),
('HR Mgr',100000,5),
('Controller',100000,1),
('SCM Mgr',105000,3),
('Finance Mgr',150000,1),
('IT Mgr',160000,2),
('Buyer',100000,3),
('IT Tech',60000,2),
('Program Mgmt Mgr',70000,4),
('Customer Rep',69000,4);

truncate table employeeTracker.employee;

insert into employeeTracker.employee (first_name,last_name,role_id,manager_id)
values ('Greg','King',2,1),
('Evan ','Ringle',3,1),
('Mona ','Martin',4,1),
('Scott','Carter',5,2),
('Dave ','Wiseman',6,1),
('Stu','Hall',7,2),
('David','Brant',8,2),
('Chance','Tosh',9,6),
('Gabe ','Coleman',10,8),
('Katie','Mcnatt',11,1),
('Matt','Pewewardy',1,1);


