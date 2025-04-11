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
              description="Con dulce de leche o crema"
              isVegetarian={false}
              image="https://cf-store.widencdn.net/mccormick/7/9/5/795c8c3d-0013-4ad4-88a2-1057bc3dca9e.jpg?response-content-disposition=inline%3B%20filename%3D%22flan_de_queso_cremoso_creamy_cheese_flan5769_800x800.jpg%22&response-content-type=image%2Fjpeg&Expires=1744411058&Signature=SLLJUUFTvzlqhiUcyr~y3AyX6rLmBY1HhLLXIHYAZaLXyQkmhixVwRWQZ-8QfEpuffRVRWbd~nowxaYRuxTVmkWOTH9beN0clWgrOvpYwvPvoxk75O1opTex6dr~tfhy7W9pBD~jMjsjBc~~zf6pYbUqo~dzSYQZi8fFCbMErPxohcXtKTgLb-HZLtpjv11cKwO48dd76Df7zzq1hfYo0w9va5ftXCTUTfqNPpAnzCUf-oi21vVDuPBPMLmzMOD~TAX6ZfWk64b7Y3Zk15EaIi5b9ievWEAR8R8fomEMPeaFo4l2EMWE3fLS33las~RNR4nxVHw1DfCt8qPD3ssQbA__&Key-Pair-Id=APKAJD5XONOBVWWOA65A"
              price="$3500"
            />
            <MenuItem 
              title="Tiramisú"
              description="Clásico postre italiano"
              isVegetarian={false}
              image="https://img.freepik.com/fotos-premium/delicioso-postre-tiramisu-italiano-plato-imagen-alta-resolucion-ia-generativa_804788-9940.jpg"
              price="$4000"
              
            />
            <MenuItem 
              title="Helado Artesanal"
              description="3 bochas a elección (Vainilla, Chocolate, Frutilla)"
              isVegetarian={false}
              image="https://www.fumisan.es/16799-large_default/copa-helado-cristal-primavera-280cc.jpg"   //https://img.freepik.com/foto-gratis/tres-bolas-helado-fresa-vainilla-cafe-cubierto-jarabe-chocolate_141793-476.jpg (Imagen de helado que me gusta)
              price="$4500"
            />
          </div>
        </section>

        <section id="bebidas" className="menu-section">
          <h2>Bebidas</h2>
          <div className="menu-items">
            <MenuItem 
              title="Vino Malbec"
              description="Botella 750ml"
              image="https://shop.gustoargentino.com/cdn/shop/products/malbec-lagarde-750ml.png?v=1680573156&width=480"
              price="$8000"
            />
            <MenuItem 
              title="Cerveza Artesanal"
              description="500ml"
              image="https://img.freepik.com/foto-gratis/pintas-cerveza-barril-macro-fotografia_53876-42357.jpg?semt=ais_hybrid&w=740"
              price="$3500"
            />
            <MenuItem 
              title="Gaseosas"
              description="Línea Coca-Cola 500ml"
              image="https://pizzeriaprocacchia.com.ar/wp-content/uploads/2021/10/Gaseosas-linea-Coca-Cola-x-15-lts.webp"
              price="$2500"
            />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 El Sabor de la Tradición. Todos los derechos reservados.</p>
        <p>E-Mail: Bodegonsabor@hotmail.com</p>
        <p>Teléfono: 11 2341-5673</p>
      </footer>
    </div>
  );
}

export default App;
