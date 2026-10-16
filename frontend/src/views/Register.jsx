import React, { useState } from 'react';
import { httpService } from '../services/httpService';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      // Usamos el servicio HTTP centralizado
      await httpService.post('/users/register', formData);
      
      setMessage('¡Usuario registrado con éxito!');
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      setIsError(true);
      setMessage(error.message || 'No se pudo conectar con el servidor backend.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-slate-50 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Registro de Usuario</h2>
        
        {message && (
          <div className={`p-3 mb-4 text-sm text-center font-medium rounded-lg ${isError ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-green-100 text-green-700 border border-green-200'}`}>
            {message}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="name" className="block text-slate-700 text-sm font-bold mb-2">Nombre Completo</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Tu nombre completo"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-slate-700 text-sm font-bold mb-2">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="tucorreo@email.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-slate-700 text-sm font-bold mb-2">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;