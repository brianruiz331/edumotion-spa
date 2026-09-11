export default function Courses() {
  const courseList = [
    { id: 1, title: 'React SPA desde Cero', description: 'Aprende a construir aplicaciones web modernas, rápidas y modulares con React y Vite.', level: 'Intermedio' },
    { id: 2, title: 'Diseño Web con TailwindCSS', description: 'Domina los utility-first CSS para crear interfaces adaptables (responsive) sin escribir código repetitivo.', level: 'Principiante' },
    { id: 3, title: 'Arquitectura de Software', description: 'Comprende los patrones de diseño y la estructuración modular para proyectos escalables de ingeniería.', level: 'Avanzado' },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Catálogo de Cursos</h1>
        <p className="mt-3 text-lg text-slate-600">Explora nuestras rutas de aprendizaje diseñadas para el mundo profesional actual.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {courseList.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {course.level}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h2>
              <p className="text-slate-600 text-sm mb-6">{course.description}</p>
            </div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-xl transition-colors">
              Inscribirme
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}