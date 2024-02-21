import axios from "axios";
import { getHeaders } from "./UserService";

export const GetRoles = async() => {
    try {
        const response = await axios.get('http://localhost:5027/api/Roles', getHeaders());
        return response.data;
    } catch (error) {
        throw new Error('GetRoles failed');
    }
}