import axios from 'axios';

export const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export const UpdateUser = async (user) => {
    try {
        const response = await axios.put(`http://localhost:5027/api/Usuarios`, user , getHeaders());
        return response.data;
    } catch (error) {
        throw new Error('UpdateUser failed');
    }
};

export const GetUsers = async () => {
    try {
        const response = await axios.get('http://localhost:5027/api/Usuarios', getHeaders());
        return response.data;
    } catch (error) {
        throw new Error('GetUsers failed');
    }
}


export const GetUserById = async (id) => {
    try {
        const response = await axios.get('http://localhost:5027/api/Usuarios/' + id, getHeaders());
        return response.data;
    } catch (error) {
        throw new Error('GetUsers failed');
    }
}

