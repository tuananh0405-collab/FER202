import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

function EmployeeList() {
  const { id } = useParams();
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState('');

  useEffect(() => {
    axios.get('/database.json').then((response) => {
      const departmentData = response.data.departments.find(dept => dept.id.toString() === id);
      setDepartment(departmentData.name);

      const departmentEmployees = response.data.employees.filter(
        (employee) => employee.department.toString() === id
      );
      setEmployees(departmentEmployees);
    });
  }, [id]);

  return (
    <div>
      <h2 className='d-flex justify-content-center'>List of Employees</h2>
      <Link to="/">Home</Link>
      <h3>{department}</h3>
      <Table bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}  style={{ background: "#f0f0f0" }}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.dob}</td>
              <td>{employee.gender}</td>
              <td>{employee.position}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default EmployeeList;
