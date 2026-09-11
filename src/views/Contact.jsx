export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Mensaje enviado con éxito! Gracias por contactar a Edumotion.');
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900">Ponte en Contacto</h1>
        <p className="mt-2 text-slate-600">¿Tienes dudas sobre las rutas de aprendizaje o el proyecto? Escríbenos.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-md border border-slate-200 rounded-2xl p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Nombre completo</label>
          <input type="text" required className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="Tu nombre" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Correo electrónico</label>
          <input type="email" required className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="correo@ejemplo.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Mensaje</label>
          <textarea rows="4" required className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" placeholder="¿Cómo podemos ayudarte?"></textarea>
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition-colors shadow-sm">
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
}