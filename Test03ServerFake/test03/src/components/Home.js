// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// function Home() {
//   const [departments, setDepartments] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [selectedDepartments, setSelectedDepartments] = useState([]);
//   const [selectedSingleDepartment, setSelectedSingleDepartment] = useState('All');

//   useEffect(() => {
//     axios.get('/database.json').then((response) => {
//       setDepartments(response.data.departments);
//       setProjects(response.data.projects);
//     });
//   }, []);

//   const filterProjects = () => {
//     if (selectedSingleDepartment !== 'All') {
//       return projects.filter((project) =>
//         project.department.toString() === selectedSingleDepartment
//       );
//     }
//     if (selectedDepartments.length === 0 || selectedDepartments.includes('All')) {
//       return projects;
//     }
//     return projects.filter((project) =>
//       selectedDepartments.includes(project.department.toString())
//     );
//   };

//   const handleMultiDepartmentChange = (event) => {
//     const value = event.target.value;
//     if (value === 'All') {
//       setSelectedDepartments(['All']);
//     } else {
//       if (selectedDepartments.includes(value)) {
//         setSelectedDepartments(selectedDepartments.filter((id) => id !== value));
//       } else {
//         setSelectedDepartments([...selectedDepartments.filter((id) => id !== 'All'), value]);
//       }
//     }
//   };

//   const handleSingleDepartmentChange = (event) => {
//     setSelectedSingleDepartment(event.target.value);
//   };

//   return (
//     <Container>
//         <h4 className='d-flex justify-content-center p-3 mb-2 bg-info text-white'>List of Projects</h4>
//       <Row>
//         <Col md={3}>
//           <h4 className='text-primary'>Departments (select one)</h4>
//           <Form>
//             <Form.Check
//               type="radio"
//               label="All"
//               value="All"
//               checked={selectedSingleDepartment === 'All'}
//               onChange={handleSingleDepartmentChange}
//             />
//             {departments.map((dept) => (
//               <Form.Check
//                 key={dept.id}
//                 type="radio"
//                 label={dept.name}
//                 value={dept.id}
//                 checked={selectedSingleDepartment === dept.id.toString()}
//                 onChange={handleSingleDepartmentChange}
//               />
//             ))}
//           </Form>
//           <h4 className='text-primary'>Departments (select some)</h4>
//           <Form>
//             <Form.Check
//               type="checkbox"
//               label="All"
//               value="All"
//               checked={selectedDepartments.includes('All')}
//               onChange={handleMultiDepartmentChange}
//             />
//             {departments.map((dept) => (
//               <Form.Check
//                 key={dept.id}
//                 type="checkbox"
//                 label={dept.name}
//                 value={dept.id}
//                 checked={selectedDepartments.includes(dept.id.toString())}
//                 onChange={handleMultiDepartmentChange}
//               />
//             ))}
//           </Form>
//         </Col>
//         <Col md={9}>
          
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Id</th>
//                 <th>Name</th>
//                 <th>Description</th>
//                 <th>Start Date</th>
//                 <th>Type</th>
//                 <th>Department</th>
//                 <th>Function</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filterProjects().map((project) => (
//                 <tr key={project.id}>
//                   <td>{project.id}</td>
//                   <td>{project.name}</td>
//                   <td>{project.description}</td>
//                   <td>{project.startDate}</td>
//                   <td>{project.type}</td>
//                   <td>
//                     <Link to={`/departments/${project.department}/employees`}>
//                       {departments.find((dept) => dept.id.toString() === project.department.toString())?.name}
//                     </Link>
//                   </td>
//                   <td>
//                     <Button variant='success' as={Link} to={`/projects/edit/${project.id}`}>Edit</Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default Home;

import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home({ projects, departments }) {
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedSingleDepartment, setSelectedSingleDepartment] = useState('All');

  const filterProjects = () => {
    if (selectedSingleDepartment !== 'All') {
      return projects.filter((project) =>
        project.department.toString() === selectedSingleDepartment
      );
    }
    if (selectedDepartments.length === 0 || selectedDepartments.includes('All')) {
      return projects;
    }
    return projects.filter((project) =>
      selectedDepartments.includes(project.department.toString())
    );
  };

  const handleMultiDepartmentChange = (event) => {
    const value = event.target.value;
    if (value === 'All') {
      setSelectedDepartments(['All']);
    } else {
      if (selectedDepartments.includes(value)) {
        setSelectedDepartments(selectedDepartments.filter((id) => id !== value));
      } else {
        setSelectedDepartments([...selectedDepartments.filter((id) => id !== 'All'), value]);
      }
    }
  };

  const handleSingleDepartmentChange = (event) => {
    setSelectedSingleDepartment(event.target.value);
  };

  return (
    <Container>
      <h4 className='d-flex justify-content-center p-3 mb-2 bg-info text-white'>List of Projects</h4>
      <Row>
        <Col md={3}>
          <h4 className='text-primary'>Departments (select one)</h4>
          <Form>
            <Form.Check
              type="radio"
              label="All"
              value="All"
              checked={selectedSingleDepartment === 'All'}
              onChange={handleSingleDepartmentChange}
            />
            {departments.map((dept) => (
              <Form.Check
                key={dept.id}
                type="radio"
                label={dept.name}
                value={dept.id}
                checked={selectedSingleDepartment === dept.id.toString()}
                onChange={handleSingleDepartmentChange}
              />
            ))}
          </Form>
          <h4 className='text-primary'>Departments (select some)</h4>
          <Form>
            <Form.Check
              type="checkbox"
              label="All"
              value="All"
              checked={selectedDepartments.includes('All')}
              onChange={handleMultiDepartmentChange}
            />
            {departments.map((dept) => (
              <Form.Check
                key={dept.id}
                type="checkbox"
                label={dept.name}
                value={dept.id}
                checked={selectedDepartments.includes(dept.id.toString())}
                onChange={handleMultiDepartmentChange}
              />
            ))}
          </Form>
        </Col>
        <Col md={9}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>Type</th>
                <th>Department</th>
                <th>Function</th>
              </tr>
            </thead>
            <tbody>
              {filterProjects().map((project) => (
                <tr key={project.id}>
                  <td>{project.id}</td>
                  <td>{project.name}</td>
                  <td>{project.description}</td>
                  <td>{project.startDate}</td>
                  <td>{project.type}</td>
                  <td>
                    <Link to={`/departments/${project.department}/employees`}>
                      {departments.find((dept) => dept.id.toString() === project.department.toString())?.name}
                    </Link>
                  </td>
                  <td>
                    <Button variant='success' as={Link} to={`/projects/edit/${project.id}`}>Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
