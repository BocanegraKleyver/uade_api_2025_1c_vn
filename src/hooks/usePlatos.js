import { useState, useEffect } from "react";
import { axiosPublic } from "../utils/axios";

const usePlatos = () => {
  const [platos, setPlatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlatos = async () => {
      try {
        const { data } = await axiosPublic.get("/platos");
        setPlatos(data);
      } catch (err) {
        console.error("Error al cargar platos:", err);
        setError("No se pudieron cargar los platos.");
      } finally {
        setCargando(false);
      }
    };

    fetchPlatos();
  }, []);

  return { platos, cargando, error };
};

export default usePlatos;
