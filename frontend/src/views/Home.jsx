import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
        Transforma tu futuro con <span className="text-indigo-600">Edumotion</span>
      </h1>
      <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10">
        Plataforma educativa de vanguardia diseñada para potenciar habilidades tecnológicas y profesionales mediante rutas de aprendizaje interactivas.
      </p>
      <div className="flex justify-center gap-4">
        <Link to="/courses" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all">
          Ver Catálogo de Cursos
        </Link>
        <Link to="/contact" className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold px-6 py-3 rounded-xl shadow-sm transition-all">
          Contáctanos
        </Link>
      </div>
    </div>
  );
}