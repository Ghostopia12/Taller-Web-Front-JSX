import { jwtDecode } from "jwt-decode";

export const SaveToStorage = (key, value) => {
    localStorage.setItem(key, value);
};

export const GetFromStorage = (key) => {
    return localStorage.getItem(key);
}

export const GetIdFromStorage = () => {
    const token = localStorage.getItem('token');
    console.log(jwtDecode(token));
    const id = jwtDecode(token).id;
    return id;
}