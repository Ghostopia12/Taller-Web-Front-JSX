import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import { GetUserById } from '../services/UserService';

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // Assuming localStorage.getItem("token") is not null or undefined
        const decodedToken = jwtDecode(localStorage.getItem("token"));
        const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

        const currentUser = await GetUserById(userId);

        if (currentUser) {
          // console.log("username: ", currentUser.result.username);
          setCurrentUser(currentUser.result); // Store the current user in state
        } else {
          console.log("Usuario no encontrado");
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  return currentUser;
};
