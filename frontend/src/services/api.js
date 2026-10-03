import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Exportamos ambos formatos para compatibilidad con todas tus vistas
export const peticionAPI = api;
export default api;