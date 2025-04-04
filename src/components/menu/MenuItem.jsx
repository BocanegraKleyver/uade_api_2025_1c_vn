import React from 'react';

function MenuItem({ title, description, price, image, isVegetarian }) {
  return (
    <div className="menu-item">
      <h3>{title}</h3>
      {image && <img src={image} alt={title} className="menu-item-image" />}
      <p>{description}</p>
      <span className="price">{price}</span>
      {isVegetarian && <span className="vegetarian-label">Es Vegetariano</span>}
    </div>
  );
}

export default MenuItem; 