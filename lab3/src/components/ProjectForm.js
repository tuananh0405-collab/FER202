import React, { useState, useEffect } from 'react';

const ProjectForm = ({ project, onSave }) => {
  const [formData, setFormData] = useState({ id: '', name: '', description: '', startDate: '', type: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (project) {
      setFormData(project);
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      setError('Please enter the form fields that are required');
    } else {
      onSave(formData);
      setError('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
  
      <div className="form-group">
        <label>Project name:</label>
        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} style={{ height: '150px' }} />
      </div>
      <div className="form-group">
        <label>Start Date:</label>
        <input type="date" className="form-control" name="startDate" value={formData.startDate} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Type:</label>
        <input type="text" className="form-control" name="type" value={formData.type} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary">Update</button>
      {error && <p className="text-danger">{error}</p>}
    </form>
  );
};

export default ProjectForm;
