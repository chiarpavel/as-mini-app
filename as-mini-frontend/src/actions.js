import axios from 'axios';
import config from './config';

if (process.env.NODE_ENV === 'development') axios.defaults.withCredentials = true;

export const type = {
    SET_SESSION: 'SET_SESSION',
    SET_REGISTER_RESPONSE: 'SET_REGISTER_RESPONSE',
    SET_PROPERTIES: 'SET_PROPERTIES',
    SET_FILTERS: 'SET_FILTERS'
};

export function setSession(session) {
    return { type: type.SET_SESSION, session };
}

export function login({ username, password }) {
    return async dispatch => {
        dispatch(setSession({ pending: true }));

        try {
            await axios.post(`${config.serverUrl}/api/auth/login`, { username, password });
            const session = { username, authenticated: true };
            localStorage.session = JSON.stringify(session);
            dispatch(setSession(session));
        } catch (error) {
            if (error.response?.status === 401) {
                dispatch(setSession({ error: 'Invalid credentials'}));
            } else {
                dispatch(setSession({ error: error.message }));
            }
        }
    };
};

export function social({ token, name }) {
    return async dispatch => {
        dispatch(setSession({ pending: true }));

        try {
            await axios.post(`${config.serverUrl}/api/auth/social`, { token, name });
            const session = { name, authenticated: true };
            localStorage.session = JSON.stringify(session);
            dispatch(setSession(session));
        } catch (error) {
            if (error.response?.status === 422) {
                dispatch(setSession({ error: 'Invalid parameters' }));
            } else {
                dispatch(setSession({ error: error.message }));
            }
        }
    };
}

export function logout() {
    return dispatch => {
        axios.post(`${config.serverUrl}/api/auth/logout`);
        localStorage.removeItem('session');
        dispatch(setSession(null));
    }
}

export function register({ username, password, email }) {
    return async dispatch => {
        dispatch(setSession({ registerPending: true }))
        try {
            await axios.post(`${config.serverUrl}/api/auth/register`, { username, password, email });
            dispatch(login({ username, password }));
        } catch (error) {
            if (error.response?.status === 422) {
                dispatch(setSession({ registerError: 'Invalid parameters' }));
            } else {
                dispatch(setSession({ registerError: error.message }));
            }
        }
    };
}

function setProperties(properties) {
    return { type: type.SET_PROPERTIES, properties };
}

export function fetchProperties() {
    return async dispatch => {
        dispatch(setProperties({ pending: true }));

        try {
            const response = await axios.get(`${config.serverUrl}/api/properties`);
            dispatch(setProperties({ data: response.data }));
        } catch (error) {
            if (error.request?.status === 401) {
                dispatch(logout());
            }
            dispatch(setProperties({ error: error.message }));
        }
    };
}

export function setFilters(filters) {
    return { type: type.SET_FILTERS, filters };
}
