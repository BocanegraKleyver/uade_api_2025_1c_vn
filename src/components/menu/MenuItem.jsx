/*import React from 'react';

function MenuItem({ title, description, price, image, isVegetarian }) {
  return (
    <div className="menu-item">
      <h3>{title}</h3>
      {image && <img src={image} alt={title} className="menu-item-image" />}
      <p>{description}</p>
      <p>{isVegetarian ? "Es Vegetariano" : "No es vegetariano"}</p>
      <span className="price">{price}</span>
    </div>
  );
}

export default MenuItem; */


import React from 'react';

const MenuItem = ({ item }) => {
  return (
    <div style={{ borderBottom: '1px solid #ccc', marginBottom: '1.5rem', paddingBottom: '1rem' }}>
      <h3>{item.nombre} - ${item.precio}</h3>
      <p><strong>{item.descripcion}</strong></p>
      <p><em>Ingredientes:</em> {item.ingredientes.join(', ')}</p>
      <p><em>Alérgenos:</em> {item.alergenos.join(', ')}</p>
    </div>
  );
};

export default MenuItem;
