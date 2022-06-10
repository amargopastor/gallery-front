import axios from 'axios';

const api_client = axios.create({ baseURL: 'http://127.0.0.1:3001' });

export default api_client;
