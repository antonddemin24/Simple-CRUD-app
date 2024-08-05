import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliZGV4ZHVma25kZGJjaGV3ZGttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyNDcyODUsImV4cCI6MjAzNzgyMzI4NX0.k62P6W0dO7E_BJpy9zVfm-HYhVlE3vrRldMo_1uUa9U';

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
