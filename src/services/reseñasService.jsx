// services/reseñaService.js

export const getReseñas = (platoNombre) => {
    const key = `reseñas_${platoNombre}`;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  };
  
  export const guardarReseña = (platoNombre, nuevaReseña) => {
    const key = `reseñas_${platoNombre}`;
    const anteriores = getReseñas(platoNombre);
    const actualizadas = [...anteriores, nuevaReseña];
    localStorage.setItem(key, JSON.stringify(actualizadas));
    return actualizadas;
  };
  