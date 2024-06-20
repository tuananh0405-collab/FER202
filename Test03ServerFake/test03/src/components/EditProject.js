// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';
// import { Form, Button } from 'react-bootstrap';

// function EditProject() {
//   const { id } = useParams();
//   const [project, setProject] = useState({
//     name: '',
//     description: '',
//     startDate: '',
//     type: '',
//     department: '',
//   });
//   const [departmentName, setDepartmentName] = useState('');

//   useEffect(() => {
//     axios.get('/database.json').then((response) => {
//       const projectData = response.data.projects.find(proj => proj.id.toString() === id);
//       if (projectData) {
//         setProject(projectData);
//         const departmentData = response.data.departments.find(dept => dept.id === projectData.department);
//         setDepartmentName(departmentData?.name || '');
//       }
//     });
//   }, [id]);

//   if (!project.name) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2 className='d-flex justify-content-center'>Edit Project</h2>
//       <Link to="/">Home page</Link>
//       <Form>
//         <Form.Group>
//           <Form.Label>Name</Form.Label>
//           <Form.Control type="text" value={project.name}  />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Description</Form.Label>
//           <Form.Control as="textarea" rows={3} value={project.description}  />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Start Date</Form.Label>
//           <Form.Control type="date" value={project.startDate}  />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Type</Form.Label>
//           <Form.Control type="text" value={project.type}  />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Department</Form.Label>
//           <Form.Control type="text" value={departmentName}  />
//         </Form.Group>
//         <Button variant="success" type="submit">Update</Button>
//       </Form>
//     </div>
//   );
// }

// export default EditProject;

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';

function EditProject({ projects, departments, updateProject }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({
    name: '',
    description: '',
    startDate: '',
    type: '',
    department: '',
  });
  const [departmentName, setDepartmentName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const projectData = projects.find(proj => proj.id.toString() === id);
    if (projectData) {
      setProject(projectData);
      const departmentData = departments.find(dept => dept.id === projectData.department);
      setDepartmentName(departmentData?.name || '');
    }
  }, [id, projects, departments]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({
      ...project,
      [name]: value,
    });
  };

  const handleDepartmentChange = (e) => {
    const departmentId = parseInt(e.target.value, 10);
    const department = departments.find(dept => dept.id === departmentId);
    setProject({
      ...project,
      department: departmentId,
    });
    setDepartmentName(department?.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProject(project);
    setMessage('Project updated successfully!');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div>
      {message && <Alert variant="success">{message}</Alert>}
      <h2 className='d-flex justify-content-center'>Edit Project</h2>
      <Link to="/">Home page</Link>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={project.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={project.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={project.startDate}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            name="type"
            value={project.type}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Department</Form.Label>
          <Form.Control
            as="select"
            name="department"
            value={project.department}
            onChange={handleDepartmentChange}
          >
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="success" type="submit">Update</Button>
      </Form>
    </div>
  );
}

export default EditProject;
