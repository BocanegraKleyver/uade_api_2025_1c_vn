const menuData = [
  {
    categoria: "Desayunos",
    platos: [
      {
        nombre: "Medialunas",
        descripcion: "Croissants típicos argentinos dulces o salados",
        precio: 700,
        alergenos: ["Gluten"],
      },
      {
        nombre: "TostadasDDL",
        descripcion: "Pan tostado acompañado con manteca y dulce de leche",
        precio: 850,
        alergenos: ["Gluten", "Lácteos"],
      },
    ],
  },
  {
    categoria: "Platos Principales",
    platos: [
      {
        nombre: "Asado",
        descripcion: "Corte de carne vacuna a la parrilla",
        precio: 3500,
        alergenos: [],
      },
      {
        nombre: "Milanesa",
        descripcion: "Milanesa con salsa de tomate, jamón y queso",
        precio: 2800,
        alergenos: ["Gluten", "Lácteos"],
      },
    ],
  },
  {
    categoria: "Pizzas y Hamburguesas",
    platos: [
      {
        nombre: "Pizza",
        descripcion: "Pizza rellena de queso y cebolla",
        precio: 2300,
        alergenos: ["Gluten", "Lácteos"],
      },
      {
        nombre: "Hamburguesa",
        descripcion: "Con lechuga, tomate, queso, jamón y huevo",
        precio: 2000,
        alergenos: ["Gluten", "Huevo"],
      },
    ],
  },
  {
    categoria: "Postres",
    platos: [
      {
        nombre: "Alfajores",
        descripcion: "Clásicos con relleno de dulce de leche",
        precio: 600,
        alergenos: ["Gluten", "Lácteos"],
      },
    ],
  },
  {
    categoria: "Bebidas y Vinos",
    platos: [
      {
        nombre: "FernetCoca",
        descripcion: "Clásico argentino con hielo",
        precio: 1000,
        alergenos: [],
      },
      {
        nombre: "Malbec",
        descripcion: "Vino tinto argentino por copa",
        precio: 1400,
        alergenos: [],
      },
    ],
  },
];

export default menuData;
