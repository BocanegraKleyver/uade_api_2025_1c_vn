import './App.css';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Nombre del Restaurante</h1>
        <nav>
          <ul>
            <li><a href="#entradas">Entradas</a></li>
            <li><a href="#principales">Platos Principales</a></li>
            <li><a href="#postres">Postres</a></li>
            <li><a href="#bebidas">Bebidas</a></li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <section className="hero">
          <h2>Nuestro Menú</h2>
          <p>Descubre nuestra selección de platos tradicionales</p>
        </section>

        <section id="entradas" className="menu-section">
          <h2>Entradas</h2>
          <div className="menu-items">
            <div className="menu-item">
              <h3>Empanadas</h3>
              <p>De carne, pollo o jamón y queso. Fritas o al horno</p>
              <span className="price">$3500</span>
            </div>
            <div className="menu-item">
              <h3>Provoleta</h3>
              <p>Queso provolone gratinado con orégano y aceite de oliva</p>
              <span className="price">$2000</span>
            </div>
            <div className="menu-item">
              <h3>Chorizo a la Parrilla</h3>
              <p>Acompañado de pan y chimichurri</p>
              <span className="price">$2500</span>
            </div>
          </div>
        </section>

        <section id="principales" className="menu-section">
          <h2>Platos Principales</h2>
          <div className="menu-items">
            <div className="menu-item">
              <h3>Bife de Chorizo</h3>
              <p>300g con ensalada mixta y papas fritas</p>
              <span className="price">$13000</span>
            </div>
            <div className="menu-item">
              <h3>Pollo a la Parrilla</h3>
              <p>Acompañado de ensalada rusa o papas fritas</p>
              <span className="price">$10500</span>
            </div>
            <div className="menu-item">
              <h3>Pasta Casera</h3>
              <p>Con salsa a elección (roja, rosa, blanca, boloñesa, napolitana, carbonara)</p>
              <span className="price">11000</span>
            </div>
          </div>
        </section>

        <section id="postres" className="menu-section">
          <h2>Postres</h2>
          <div className="menu-items">
            <div className="menu-item">
              <h3>Flan Casero</h3>
              <p>Con dulce de leche o crema a elección</p>
              <span className="price">$3500</span>
            </div>
            <div className="menu-item">
              <h3>Tiramisú</h3>
              <p>Clásico postre italiano</p>
              <span className="price">$4500</span>
            </div>
            <div className="menu-item">
              <h3>Helado Artesanal</h3>
              <p>3 bochas a elección (crema americana, chocolate, dulce de leche, frutilla)</p>
              <span className="price">$3500</span>
            </div>
          </div>
        </section>

        <section id="bebidas" className="menu-section">
          <h2>Bebidas</h2>
          <div className="menu-items">
            <div className="menu-item">
              <h3>Vino Malbec</h3>
              <p>Botella 750ml</p>
              <span className="price">$5000</span>
            </div>
            <div className="menu-item">
              <h3>Cerveza Artesanal</h3>
              <p>500ml</p>
              <span className="price">$3000</span>
            </div>
            <div className="menu-item">
              <h3>Gaseosas</h3>
              <p>Línea Coca-Cola 500ml</p>
              <span className="price">$2000</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Nombre del Restaurante. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
