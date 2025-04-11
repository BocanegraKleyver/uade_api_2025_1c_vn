import React from 'react';

function Header() {
  return (
    <header className="header">
      <h1>El Sabor de la Tradición</h1>
      <nav>
        <ul>
          <li><a href="#entradas">Entradas</a></li>
          <li><a href="#principales">Platos Principales</a></li>
          <li><a href="#postres">Postres</a></li>
          <li><a href="#bebidas">Bebidas</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header; 