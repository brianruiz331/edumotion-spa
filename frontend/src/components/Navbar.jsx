import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert('Sesión cerrada con éxito');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-extrabold text-indigo-600 tracking-tight">Edumotion</span>
          </div>
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Inicio</Link>
            <Link to="/courses" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Cursos</Link>
            <Link to="/contact" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Contacto</Link>
            <Link to="/register" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Autorregistro</Link>
            <Link to="/login" className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-2 rounded-lg font-medium transition-all">Iniciar Sesión</Link>
            <button onClick={handleLogout} className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
