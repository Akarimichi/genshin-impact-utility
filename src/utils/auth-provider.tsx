import axios from 'axios';
import { Action, useDispatch } from '../redux/store';
import jwt_decode from 'jwt-decode';
import { Dispatch } from 'redux';

export const axiosApiInstance = axios.create();

// Setup axios instance with api token
axiosApiInstance.interceptors.request.use(
    async (config) => {
        config.headers = {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

// Refresh user token
axiosApiInstance.interceptors.response.use((response) => {
    return response;
}, async function(error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const resp: any = await refreshAccessToken();
        localStorage.setItem('access_token', resp.data.access_token);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + resp.data.access_token;

        return axiosApiInstance(originalRequest);

    }

    return Promise.reject(error);
});


const refreshAccessToken = () => {
    return axios({
        method: 'post',
        url: `${process.env.API_GENSHIN_UTILTY_URL}/auth/refresh`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

const authProvider = {
    // Save auth token
    saveToken: (access_token: string, refresh_token: string, dispatch: Dispatch<Action>) => {
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        dispatch({ type: 'User/SetUser', user: (jwt_decode(access_token) as any).sub });
    },
    // API authentication
    auth: (
        email: string,
        password: string,
        onSucces: (access_token: string, refresh_token: string) => void | null = null,
        onError: (err?: any) => void | null = null
    ) => {

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        axiosApiInstance({
            method: 'post',
            url: `${process.env.API_GENSHIN_UTILTY_URL}/auth/login`,
            data: formData
        })
        .then((res) => {
            if (onSucces) {
                onSucces(res.data.access_token, res.data.refresh_token);
            }
        })
        .catch(onError);
    },
    // Google authentication
    authGoogle: (
        googleToken: string,
        onSucces: (access_token: string, refresh_token: string) => void | null = null,
        onError: (err?: any) => void | null = null
    ) => {

        const formData = new FormData();
        formData.append('token', googleToken);

        axios({
            method: 'post',
            url: `${process.env.API_GENSHIN_UTILTY_URL}/auth/google`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
            if (onSucces) {
                onSucces(res.data.access_token, res.data.refresh_token);
            }
        })
        .catch(onError);
    },
    // Twitter authentication
    authTwitter: (
        response: any,
        onSucces: (access_token: string, refresh_token: string) => void | null = null
    ) => {
        response.json().then((data: any) => {
            if (onSucces) {
                onSucces(data.access_token, data.refresh_token);
            }
        });
    },
    // Register user
    registerUser: (
        formData: any,
        onSucces: (access_token: string, refresh_token: string) => void | null = null,
        onError: (err?: any) => void | null = null
    ) => {

        axios({
            method: 'post',
            url: `${process.env.API_GENSHIN_UTILTY_URL}/users/register`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((res) => {
            if (onSucces) {
                onSucces(res.data.access_token, res.data.refresh_token);
            }
        })
        .catch(onError);
    },
    logout: (dispatch: Dispatch<Action>) => {

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        dispatch({ type: 'User/SetUser', user: null });

    }
};

export default authProvider;

