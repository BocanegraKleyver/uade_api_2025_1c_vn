# 🍽️ Sabores Urbanos - Frontend

Bienvenido a **Sabores Urbanos**, una carta digital interactiva desarrollada como parte del proyecto académico para la materia **Aplicaciones Interactivas 2025 1C VN- UADE**.

Este proyecto representa una carta profesional para un restaurante argentino, diseñada con enfoque mobile-first, moderna, responsiva, con una experiencia de usuario cuidada tanto para el público general como para el panel administrativo.

---

## ✨ Descripción General

La app permite:

- Visualizar y explorar platos organizados por categorías
- Buscar en tiempo real
- Ver detalles con imagen, precio, alérgenos, etiquetas visuales (Vegano, Picante, Sin lactosa)
- Agregar reseñas con estrellas y comentarios
- Acceder a sección de contacto, QR, mapa
- Volver arriba con botón flotante
- Animaciones suaves con Framer Motion
- Diseño moderno con estilo glassmorphism

### 🛠️ Panel de Administración (Privado)

Ubicado en `/admin`, cuenta con:

- Login con JWT y persistencia de sesión
- Control de acceso por roles y permisos
- Vista responsive adaptada a escritorio y móvil

#### Módulos de gestión:

✅ Gestión de Usuarios  
✅ Gestión de Platos (CRUD completo con imágenes)  
✅ Gestión de Reseñas (moderar, responder, ordenar)  
✅ Gestión de Logs (acciones del sistema)

---

## 🧰 Tecnologías utilizadas

- **React** (Create React App)
- **React Router DOM**
- **Material UI (MUI)**
- **Framer Motion**
- **Axios**
- **LocalStorage** (reseñas públicas)
- **JWT Decode**
- **Fontsource** (Inter, Rubik, Playfair)

---

## 🚀 Cómo correr el proyecto

### Clonar el repositorio:

```bash
git clone https://github.com/BocanegraKleyver/uade_api_2025_1c_vn.git
```

### Instalar dependencias:

```bash
npm install
```

### Iniciar entorno local:

```bash
npm start
```

La app se abrirá en:  
📍 `http://localhost:3000`

### Configurar `.env`:

```env
REACT_APP_API_URL=http://localhost:3001
```

---

## 🌐 Versión desplegada (Vercel)

🔗 https://uade-api-2025-1c-vn.vercel.app

### 📱 QR de acceso

Escaneá con tu celular para acceder directamente:

<img src="./src/assets/QR-Sabores_Urbanos.png" alt="QR Sabores Urbanos" width="200"/>

---

## 🧑‍🏫 Docentes

- Sarasa, María Paula
- Fares, Francisco Joaquín

## 👨‍💻 Autores

- **Bocanegra Kleyver** - Legajo 1116590 - UADE - API 2025 - 1C - Viernes Turno Noche
- **Lazbal Santiago** - Legajo 1130853 - UADE - API 2025 - 1C - Viernes Turno Noche

---

## 🗃️ Estructura del proyecto

```
src/
├── components/        # Componentes reutilizables
├── pages/             # Home, Menú, Contacto, etc.
├── admin/             # Pantallas privadas: Dashboard, CRUDs
├── context/           # Contexto de autenticación
├── routes/            # Rutas protegidas
├── services/          # Llamadas Axios al backend
├── styles/            # Temas y estilos
└── utils/             # Helpers
```

---

Este proyecto demuestra una integración completa **frontend + backend**, respetando buenas prácticas, control de acceso y diseño moderno.
