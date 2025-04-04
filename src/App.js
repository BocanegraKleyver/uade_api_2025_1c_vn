import './App.css';
import Header from './components/layout/Header';
import MenuItem from './components/menu/MenuItem';

function App() {
  return (
    <div className="App">
      <Header />

      <main className="main-content">
        <section className="hero">
          <h2>Nuestro Menú</h2>
          <p>Descubre nuestra selección de platos tradicionales</p>
        </section>

        <section id="entradas" className="menu-section">
          <h2>Entradas</h2>
          <div className="menu-items">
            <MenuItem 
              title="Empanadas"
              description="Rellenas de carne, pollo o jamón y queso"
              price="$350"
            />
            <MenuItem 
              title="Provoleta"
              description="Queso provolone gratinado con orégano y aceite de oliva"
              price="$450"
            />
            <MenuItem 
              title="Chorizo a la Parrilla"
              description="Acompañado de pan y chimichurri"
              price="$400"
            />
          </div>
        </section>

        <section id="principales" className="menu-section">
          <h2>Platos Principales</h2>
          <div className="menu-items">
            <MenuItem 
              title="Bife de Chorizo"
              description="300g con ensalada mixta o papas fritas"
              price="$12100"
            />
            <MenuItem 
              title="Pollo a la Parrilla"
              description="Con ensalada rusa o papas al horno"
              price="$9900"
            />
            <MenuItem 
              title="Pasta Casera"
              description="Con salsa a elección (roja, albahaca, rosa, blanca, boloñesa, carbonara)"
              price="$8000"
            />
          </div>
        </section>

        <section id="postres" className="menu-section">
          <h2>Postres</h2>
          <div className="menu-items">
            <MenuItem 
              title="Flan Casero"
              description="Con dulce de leche y crema"
              price="$400"
            />
            <MenuItem 
              title="Tiramisú"
              description="Clásico postre italiano"
              price="$450"
            />
            <MenuItem 
              title="Helado Artesanal"
              description="3 bochas a elección"
              price="$350"
            />
          </div>
        </section>

        <section id="bebidas" className="menu-section">
          <h2>Bebidas</h2>
          <div className="menu-items">
            <MenuItem 
              title="Vino Malbec"
              description="Botella 750ml"
              price="$800"
            />
            <MenuItem 
              title="Cerveza Artesanal"
              description="500ml"
              price="$300"
            />
            <MenuItem 
              title="Gaseosas"
              description="Línea Coca-Cola 500ml"
              price="$200"
            />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 El Sabor de la Tradición. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
