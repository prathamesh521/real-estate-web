import axios from 'axios';
import Cookies from 'js-cookie';

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

    if (response.data) {
        // Store the token in a cookie accessible by the client side
        Cookies.set('cookie-client', response.data.token, {
            secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
            sameSite: 'lax', // More relaxed handling for cross-site requests
        });
    }

    return response.data
};

const getMe = async () => {
    const response = await axios.get(api_url + 'me');

    if (response.data) {
        console.log("user: ", response.data)
    }

    return response.data;

};

const authServices = {
    register,
    login,
    getMe
};

export default authServices;