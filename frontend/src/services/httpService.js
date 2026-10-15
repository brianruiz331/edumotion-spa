import { API_BASE_URL } from '../config/api'; // O ajusta la ruta si tu api.js está en otra parte

export const httpService = {
  // Petición GET para obtener datos (como la lista de usuarios)
  get: async (endpoint) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener los datos');
      }

      return data;
    } catch (error) {
      console.error('Error en httpService GET:', error);
      throw error;
    }
  },

  // Petición POST para enviar datos (como el registro o login)
  post: async (endpoint, bodyData) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en la petición');
      }

      return data;
    } catch (error) {
      console.error('Error en httpService POST:', error);
      throw error;
    }
  }
};