import axios from 'axios';

export const api_client = axios.create({ baseURL: 'http://127.0.0.1:3001' });

export const fetcher = async (resource, init) => {
  console.log(init);
  const res = await api_client.get(resource);
  return res.data;
};
