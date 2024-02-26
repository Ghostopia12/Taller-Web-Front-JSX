import axios from "axios";
import { jwtDecode } from "jwt-decode"; // import dependency
import { SaveToStorage } from "./StorageService";

export const login = async (credentials) => {
  try {
    const response = await axios.post(
      "http://localhost:5027/authenticate",
      credentials
    );
    if (response.status === 200) {
      const decodedJwt = jwtDecode(response.data.token);
      const roles =
        decodedJwt[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      const rolesArray = roles.split(",");
      SaveToStorage("token", response.data.token);
      const id = jwtDecode(localStorage.getItem("token"))[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ];
      SaveToStorage("userId", id);
      SaveToStorage("roles", JSON.stringify(rolesArray));
      return response.data.token;
    } else {
      throw new Error("Invalid username or password");
    }
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
