import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Revisar si hay un usuario con sesión activa en localStorage
    const activo = localStorage.getItem('usuarioActivo');
    if (activo) {
      setNombreUsuario(activo);
    }
  }, []);

  const handleLogout = () => {
    // Borrar la sesión activa
    localStorage.removeItem('usuarioActivo');
    setNombreUsuario('');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">Edumotion</Link>
      
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-gray-600 hover:text-blue-600">Inicio</Link>
        <Link to="/courses" className="text-gray-600 hover:text-blue-600">Cursos</Link>
        <Link to="/contact" className="text-gray-600 hover:text-blue-600">Contacto</Link>

        {nombreUsuario ? (
          // Si hay sesión iniciada, muestra el saludo y el botón de cerrar sesión
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-gray-800">¡Hola, {nombreUsuario}!</span>
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm transition duration-200"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          // Si no ha iniciado sesión, muestra los botones normales
          <div className="flex space-x-3">
            <Link to="/login" className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50">Iniciar Sesión</Link>
            <Link to="/register" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Registrarse</Link>
          </div>
        )}
      </div>
    </nav>
  );
}