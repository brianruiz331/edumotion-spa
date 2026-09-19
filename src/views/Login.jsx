import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Buscar si el usuario existe en los registrados en localStorage
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuariosRegistrados.find(
      (user) => user.email === email && user.password === password
    );

    if (usuarioEncontrado || email === "admin@edumotion.com") {
      // Guardar el nombre del usuario activo para mostrarlo en la app
      const nombreUsuario = usuarioEncontrado ? usuarioEncontrado.nombre : "Administrador";
      localStorage.setItem('usuarioActivo', nombreUsuario);

      alert(`¡Bienvenido de nuevo, ${nombreUsuario}!`);
      navigate('/courses'); // O a la vista principal que prefieras
    } else {
      // Si no está registrado, avisa y redirige al registro automáticamente
      setErrorMessage("No estás registrado. Redirigiendo al formulario de registro...");
      setTimeout(() => {
        navigate('/register');
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Iniciar Sesión - Edumotion</h2>
        
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
          >
            Ingresar
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-semibold">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
