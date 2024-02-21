import axios from 'axios';

export const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}


export const GetUsers = async () => {
    try {
        const response = await axios.get('http://localhost:5027/api/Usuarios', getHeaders());
        return response.data;
    } catch (error) {
        throw new Error('GetUsers failed');
    }
}