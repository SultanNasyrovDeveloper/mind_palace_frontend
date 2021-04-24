import axios from 'axios'
import Cookies from 'js-cookie'

import store from '@/store'
import AuthService from '@/services/auth'


let client = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
    }
});

client.interceptors.request.use(function (config) {
    Object.assign(config.headers, AuthService.getAuthHeaders());
    return config
});

client.interceptors.response.use(
    response => response,
    error => {
        const response = error.response || {};
        if (response.status === 401 && response.data.code === 'token_not_valid') {
            console.log('Error caught. Token not valid or expired.');
            if (store.getters.getUserIsLoggedIn) {
                store.dispatch('logout');
            }
        }
        return Promise.reject(error);
    }
);

export default client;