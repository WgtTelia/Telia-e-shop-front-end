import axios, { CanceledError } from 'axios';

export default axios.create({
    baseURL: '/api',
    auth: {
        username: process.env.NEXT_PUBLIC_API_USERNAME ?? '',
        password: process.env.NEXT_PUBLIC_API_PASSWORD ?? '',
    },
});

export { CanceledError };
