import React from 'react';
import { ListGroup } from 'react-bootstrap';
import '../../assets/styles/Sidebar.css'; 
function Sidebar({ categories, onSelectCategory }) {
  return (
    <ListGroup  className="custom-sidebar">
      <ListGroup.Item className="sidebar-item" onClick={() => onSelectCategory('')}>
        All Categories
      </ListGroup.Item>
      {categories.map(category => (
        <ListGroup.Item className="sidebar-item" key={category.id} onClick={() => onSelectCategory(category.name)}>
          {category.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Sidebar;
