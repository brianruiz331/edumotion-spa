export default function AdminDashboard() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-slate-900 text-white p-6 rounded-2xl mb-8 flex justify-between items-center">
        <div>
          <span className="bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">Panel de Control</span>
          <h1 className="text-3xl font-extrabold mt-2">Módulo de Administración</h1>
        </div>
        <span className="text-slate-400 text-sm">Perfil: Administrador</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-slate-500 text-sm font-medium">Usuarios Registrados</h2>
          <p className="text-3xl font-bold text-slate-900 mt-2">1,245</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-slate-500 text-sm font-medium">Cursos Activos</h2>
          <p className="text-3xl font-bold text-slate-900 mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-slate-500 text-sm font-medium">Reportes Pendientes</h2>
          <p className="text-3xl font-bold text-slate-900 mt-2">3</p>
        </div>
      </div>

      <div className="bg-white shadow-sm border border-slate-200 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Gestión de Acciones del Sistema</h2>
        <div className="flex gap-4">
          <button onClick={() => alert('Simulación: Usuario registrado manualmente')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium">
            Registrar Nuevo Usuario
          </button>
          <button onClick={() => alert('Simulación: Curso creado con éxito')} className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-medium">
            Crear Curso
          </button>
        </div>
      </div>
    </div>
  );
}