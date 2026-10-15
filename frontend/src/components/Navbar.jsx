import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Se ejecuta cada vez que cambia la ruta para refrescar el estado del usuario
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error al leer el usuario del localStorage");
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('session_token');
    setUser(null);
    alert('Sesión cerrada con éxito');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-extrabold text-indigo-600 tracking-tight">
              Edumotion
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Inicio</Link>
            <Link to="/courses" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Cursos</Link>
            <Link to="/contact" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Contacto</Link>

            {/* Renderizado condicional según el estado de la sesión */}
            {!user ? (
              <>
                <Link to="/register" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">
                  Autorregistro
                </Link>
                <Link to="/login" className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-2 rounded-lg font-medium transition-all">
                  Iniciar Sesión
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4 pl-4 border-l border-slate-200">
                <div className="text-right">
                  <span className="block text-sm font-bold text-slate-800">{user.name}</span>
                  <span className="block text-xs font-semibold text-indigo-600 capitalize">
                    {user.role === 'admin' ? 'Administrador' : 'Estudiante'}
                  </span>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-lg font-medium text-sm transition-all"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
