import axios from 'axios';

const api_url = '/api/user/';

const register = async (data) => {
    const response = await axios.post(api_url + 'register', data);
    console.log('response', response);
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

const login = async (data) => {
    const response = await axios.post(api_url + 'login', data);

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
};

const authServices = {
    register,
    login
};

export default authServices;