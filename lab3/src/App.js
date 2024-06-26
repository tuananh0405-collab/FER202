import React, { useState, useEffect } from "react";
import ProjectTable from "./components/ProjectTable";
import ProjectForm from "./components/ProjectForm";
import { ListProjects } from "./data/project";
import "./App.css";

function App() {
  const [projects, setProjects] = useState(ListProjects);
  const [currentProject, setCurrentProject] = useState(null);
  const [sortedProjects, setSortedProjects] = useState(ListProjects);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  useEffect(() => {
    let sortedData = [...projects];
    if (sortConfig.key) {
      sortedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    setSortedProjects(sortedData);
  }, [projects, sortConfig]);

  const handleEdit = (project) => {
    setCurrentProject(project);
  };

  const handleSave = (project) => {
    const updatedProjects = projects.map((p) =>
      p.id === project.id ? project : p
    );
    setProjects(updatedProjects);
    alert("Update success");
    setCurrentProject({ name: "", description: "", startDate: "", type: "" });
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="container mt-5">
      <div className="mb-2">

      <ProjectForm project={currentProject} onSave={handleSave}/>
      </div>
      <ProjectTable
        onEdit={handleEdit}
        onSort={handleSort}
        sortedProjects={sortedProjects}
      />
    </div>
  );
}

export default App;
