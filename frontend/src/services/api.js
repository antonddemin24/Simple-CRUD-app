import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

const api = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Subscription

export const fetchSubscriptions = () => {
    return api.get('/subscriptions', {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    });
};

export const createSubscription = (data) => {
    return api.post('/subscriptions', data, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    });
};

export const updateSubscription = (data) => {
    return api.patch(`/subscriptions/${data.id}`, data, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    });
};

export const deleteSubscription = (id) => {
    return api.delete(`/subscriptions/${id}`, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    });
};

// Preference

export const fetchPreferences = () => {
    return api.get('/preferences', {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    });
};

export const createPreference = (data) => {
    return api.post('/preferences', data, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    });
};

export const updatePreference = (data) => {
    return api.patch(`/preferences/${data.id}`, data, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    });
};

export const deletePreference = (id) => {
    return api.delete(`/preferences/${id}`, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    });
};

// User

export const fetchUsers = () => {
    return api.get('/users', {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    });
};

export default api;