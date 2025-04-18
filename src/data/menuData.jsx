const menuData = [
  {
    categoria: "Desayunos",
    platos: [
      {
        nombre: "Medialunas",
        descripcion: "Croissants típicos argentinos dulces o salados",
        precio: 1750,
        alergenos: ["Gluten", "Lácteos"],
        etiquetas: [] 
      },
      {
        nombre: "Omelette de Espinaca",
        descripcion: "Huevos batidos con espinaca fresca",
        precio: 3000,
        alergenos: ["Huevo"],
        etiquetas: [] 
      },
      {
        nombre: "Tostado con jamón y queso",
        descripcion: "Pan de campo con jamón cocido y queso fundido",
        precio: 3250,
        alergenos: ["Gluten", "Lácteos"],
        etiquetas: []
      },
    ]
  },
  {
    categoria: "Ensaladas",
    platos: [
      {
        nombre: "Ensalada César",
        descripcion: "Lechuga, croutons, parmesano, pollo y aderezo César",
        precio: 6250,
        alergenos: ["Lácteos", "Huevo", "Gluten"],
        etiquetas: []
      },
      {
        nombre: "Ensalada Veggie",
        descripcion: "Mix de hojas verdes, zanahoria, palta y tomate",
        precio: 5750,
        alergenos: [],
        etiquetas: ["Vegano", "Sin lactosa"]
      },
      {
        nombre: "Ensalada Burrata",
        descripcion: "Burrata fresca, rúcula, tomates cherry y oliva",
        precio: 8000,
        alergenos: ["Lácteos"],
        etiquetas: []
      }
    ]
  },
  {
    categoria: "Platos Principales",
    platos: [
      {
        nombre: "Asado",
        descripcion: "Corte de carne vacuna a la parrilla",
        precio: 8750,
        alergenos: [],
        etiquetas: [] 
      },
      {
        nombre: "Bife de Chorizo",
        descripcion: "Clásico corte argentino, con papas rústicas",
        precio: 12250,
        alergenos: [],
        etiquetas: []
      },
      {
        nombre: "Bondiola a la cerveza",
        descripcion: "Bondiola de cerdo braseada en cerveza negra",
        precio: 11500,
        alergenos: [],
        etiquetas: ["Picante"]
      },
      {
        nombre: "Lasagna Veggie",
        descripcion: "Capas de masa con vegetales, salsa y queso gratinado",
        precio: 10250,
        alergenos: ["Gluten", "Lácteos"],
        etiquetas: ["Vegano"]
      },
    ]
  },
  {
    categoria: "Pizzas y Hamburguesas",
    platos: [
      {
        nombre: "Pizza Margarita",
        descripcion: "Salsa de tomate, mozzarella y albahaca fresca",
        precio: 7500,
        alergenos: ["Gluten", "Lácteos"],
        etiquetas: []
      },
      {
        nombre: "Hamburguesa Completa",
        descripcion: "Carne, lechuga, tomate, queso, jamón y huevo",
        precio: 7000,
        alergenos: ["Gluten", "Lácteos", "Huevo"],
        etiquetas: []
      },
      {
        nombre: "Hamburguesa Veggie",
        descripcion: "Hamburguesa de garbanzos con vegetales",
        precio: 7250,
        alergenos: [],
        etiquetas: ["Vegano"] 
      }
    ]
  },
  {
    categoria: "Postres",
    platos: [
      {
        nombre: "Flan Casero",
        descripcion: "Clásico flan argentino con dulce de leche",
        precio: 3000,
        alergenos: ["Huevo", "Lácteos"],
        etiquetas: []
      },
      {
        nombre: "Volcán de Chocolate",
        descripcion: "Bizcochuelo relleno con chocolate fundido",
        precio: 3500,
        alergenos: ["Gluten", "Huevo", "Lácteos"],
        etiquetas: []
      },
      {
        nombre: "Cheesecake",
        descripcion: "Tarta de queso y base de galletas",
        precio: 3750,
        alergenos: ["Lácteos", "Gluten"],
        etiquetas: []
      },
      {
        nombre: "Alfajores",
        descripcion: "Alfajores de maicena con dulce de leche",
        precio: 2250,
        alergenos: ["Gluten", "Lácteos"],
        etiquetas: []
      }
    ]
  },
  {
    categoria: "Bebidas y Vinos",
    platos: [
      {
        nombre: "Fernet con Coca",
        descripcion: "Clásico argentino con hielo",
        precio: 3000,
        alergenos: [],
        etiquetas: [] 
      },
      {
        nombre: "Malbec",
        descripcion: "Vino tinto argentino por copa",
        precio: 4000,
        alergenos: [],
        etiquetas: []
      },
      {
        nombre: "Cerveza IPA",
        descripcion: "Cerveza artesanal con lúpulo intenso",
        precio: 3250,
        alergenos: [],
        etiquetas: []
      },
      {
        nombre: "Agua Saborizada",
        descripcion: "Con gas o sin gas, varios sabores",
        precio: 2250,
        alergenos: [],
        etiquetas: [] 
      }
    ]
  }
];

export default menuData;
