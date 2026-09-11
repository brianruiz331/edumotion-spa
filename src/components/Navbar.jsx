import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-extrabold text-indigo-600 tracking-tight">Edumotion</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Inicio</Link>
            <Link to="/courses" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Cursos</Link>
            <Link to="/contact" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Contacto</Link>
          </div>
          <div>
            <Link to="/courses" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-all">
              Explorar Plataforma
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}