import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import EditProject from './components/EditProject';
import EmployeeList from './components/EmployeeList';
import './App.css';

function App() {
  const [departments, setDepartments] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9999/departments').then((response) => {
      setDepartments(response.data);
    });
    axios.get('http://localhost:9999/projects').then((response) => {
      setProjects(response.data);
    });
  }, []);

  const updateProject = (updatedProject) => {
    setProjects(projects.map(project =>
      project.id === updatedProject.id ? updatedProject : project
    ));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home projects={projects} departments={departments} />} />
        <Route path="/projects/edit/:id" element={<EditProject projects={projects} departments={departments} updateProject={updateProject} />} />
        <Route path="/departments/:id/employees" element={<EmployeeList departments={departments} />} />
      </Routes>
    </Router>
  );
}

export default App;
