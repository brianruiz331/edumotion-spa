import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verificarSesion = () => {
      const activo = localStorage.getItem('usuarioActivo');
      setNombreUsuario(activo || '');
    };

    // Verificar al cargar la página
    verificarSesion();

    // Escuchar cambios de sesión en tiempo real
    window.addEventListener('authChange', verificarSesion);
    return () => window.removeEventListener('authChange', verificarSesion);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuarioActivo');
    // Notificar a la app que la sesión se cerró
    window.dispatchEvent(new Event('authChange'));
    setNombreUsuario('');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-xl font-bold text-blue-600">Edumotion</Link>
        
        {nombreUsuario && (
          <span className="text-gray-700 font-medium text-sm border-l pl-4 border-gray-300">
            ¡Hola, <span className="font-semibold text-blue-600">{nombreUsuario}</span>!
          </span>
        )}
      </div>
      
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-gray-600 hover:text-blue-600">Inicio</Link>
        <Link to="/courses" className="text-gray-600 hover:text-blue-600">Cursos</Link>
        <Link to="/contact" className="text-gray-600 hover:text-blue-600">Contacto</Link>

        {nombreUsuario ? (
          <button 
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm transition duration-200 font-medium"
          >
            Cerrar Sesión
          </button>
        ) : (
          <div className="flex space-x-3">
            <Link to="/login" className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50">Iniciar Sesión</Link>
            <Link to="/register" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Registrarse</Link>
          </div>
        )}
      </div>
    </nav>
  );
}