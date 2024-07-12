
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

function EmployeeList({ departments }) {
  const { id } = useParams();
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:9999/employees?department=${id}`).then((response) => {
      setEmployees(response.data);
    });

    const departmentData = departments.find(dept => dept.id.toString() === id);
    setDepartment(departmentData.name);
  }, [id, departments]);

  return (
    <div>
      <h2 className='d-flex justify-content-center'>List of Employees</h2>
      <Link to="/">Home</Link>
      <h3>{department}</h3>
      <Table striped bordered hover>
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
            // style={{ background: "#f0f0f0" }}
            <tr key={employee.id} >
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
