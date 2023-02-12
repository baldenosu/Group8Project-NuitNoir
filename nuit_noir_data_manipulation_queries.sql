-- Customers

-- Browsing Customers table.
SELECT * FROM Customers;

-- Adding a customer to Customers table.
INSERT INTO Customers (customer_name, customer_address, customer_email, customer_level_id) 
VALUES (:customer_name_Input, :customer_address_Input, :customer_email_Input, :customer_level_id_Input);

-- Update a customer's data based on submission of the Update Customer form to Customers table. 
UPDATE Customers 
SET customer_name = :customer_name_Input, customer_address = :customer_address_Input, customer_email = :customer_email_Input, customer_level_id = :customer_level_id_from_dropdown_Input
WHERE customer_name = :customer_name_from_the_Update_Form;

-- Get all Customer Level IDs and Level Types to populate the Customer_Level dropdown from Customer_Level table.
SELECT customer_level_id, level_name from Customer_Levels;


-- Employees

-- Browsing Employees table.
Select * FROM Employees;

-- Adding an employee to Employees table.
INSERT INTO Employees (employee_name, employee_title) 
VALUES (:employee_name_Input, :employee_title_Input);

-- Update an employee's data based on submission of the Update Employee form to Employees table. 
UPDATE Employees 
SET employee_name = :employee_name_Input, employee_title = :employee_title_Input
WHERE employee_name = :employee_name_from_the_Update_Form;