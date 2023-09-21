-- Insert sample departments
INSERT INTO department (name) VALUES
  ('HR'),
  ('Engineering'),
  ('Finance');

-- Insert sample roles
INSERT INTO role (title, salary, department_id) VALUES
  ('HR Manager', 80000.00, 1),
  ('Software Engineer', 95000.00, 2),
  ('Financial Analyst', 75000.00, 3);

-- Insert sample employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Bob', 'Johnson', 3, 1),
  ('Alice', 'Williams', 2, 1);
