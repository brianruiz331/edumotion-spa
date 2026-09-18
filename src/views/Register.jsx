import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    alert('¡Autorregistro exitoso! Ahora puedes iniciar sesión.');
    navigate('/login');
  };

  return (
    <div className="py-16 px-4 max-w-md mx-auto">
      <div className="bg-white shadow-md border border-slate-200 rounded-2xl p-8">
        <h1 className="text-2xl font-extrabold text-slate-900 mb-6 text-center">Autorregistro de Usuario</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nombre completo</label>
            <input 
              type="text" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" 
              placeholder="Tu nombre" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Correo electrónico</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" 
              placeholder="correo@ejemplo.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none" 
              placeholder="••••••••" 
            />
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition-colors shadow-sm">
            Registrarse
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-600">
          ¿Ya tienes cuenta? <Link to="/login" className="text-indigo-600 font-medium hover:underline">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
}