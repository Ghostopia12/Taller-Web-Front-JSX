import axios from "axios";

export const login = async (credentials) => {
  try {
    const response = await axios.post(
      "http://localhost:5027/authenticate",
      credentials
    );
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const register = async (credentials) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:5027/api/Usuarios",
      credentials,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar token al encabezado de autorización
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Register failed");
  }
};
