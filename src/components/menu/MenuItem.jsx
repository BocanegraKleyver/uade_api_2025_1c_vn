import React from 'react';

function MenuItem({ title, description, price }) {
  return (
    <div className="menu-item">
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="price">{price}</span>
    </div>
  );
}

export default MenuItem; 