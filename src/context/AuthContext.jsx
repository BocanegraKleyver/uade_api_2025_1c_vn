import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsuario({ ...decoded, token });
      } catch (e) {
        console.warn("Token inválido o expirado");
        localStorage.removeItem("token");
      }
    }
  }, []);

  
  const login = (token) => {
    const decoded = jwtDecode(token);
    setUsuario({ ...decoded, token });
    localStorage.setItem("token", token);
  };

  
  const logout = async () => {
    try {
      if (usuario?.token) {
        await fetch("http://localhost:3001/api/usuarios/logout", {

          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usuario.token}`,
          },
          body: JSON.stringify({ email: usuario.email }),
        });
      }
    } catch (error) {
      console.error("Error al registrar logout:", error.message);
    } finally {
      setUsuario(null);
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, token: usuario?.token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
