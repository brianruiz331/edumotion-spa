import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { peticionAPI } from '../services/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await peticionAPI.post('/users/login', { email, password });
            const data = response.data;
            const token = data.session_token || data.token || data.accessToken;

            if (token) {
                localStorage.setItem('session_token', token);
                alert('¡Bienvenido!');
                navigate('/admin'); // O puedes cambiarlo a la ruta que prefieras, ej: '/courses'
            } else {
                alert('No se recibió un token válido del servidor.');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Credenciales inválidas o error en el servidor.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] bg-slate-50 px-4">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Iniciar Sesión</h2>
                
                <div className="mb-4">
                    <label className="block text-slate-700 text-sm font-bold mb-2">Correo Electrónico</label>
                    <input
                        type="email"
                        placeholder="tucorreo@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-slate-700 text-sm font-bold mb-2">Contraseña</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Ingresar
                </button>
            </form>
        </div>
    );
}