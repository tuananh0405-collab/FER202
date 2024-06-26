import React from 'react';
import {Button} from 'react-bootstrap'
const ProjectTable = ({ onEdit, onSort, sortedProjects }) => {
  return (
    <table className="table table-striped">
      <thead className="">
        <tr>
          <th onClick={() => onSort('id')}>ID</th>
          <th onClick={() => onSort('name')}>Name</th>
          <th onClick={() => onSort('description')}>Description</th>
          <th onClick={() => onSort('startDate')}>Start Date</th>
          <th onClick={() => onSort('type')}>Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedProjects.map((project) => (
          <tr key={project.id}>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.description}</td>
            <td>{project.startDate}</td>
            <td>{project.type}</td>
            <td>
              <Button variant='link' onClick={() => onEdit(project)}>Edit</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProjectTable;
