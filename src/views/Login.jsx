import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Simulación de una base de datos o lista de usuarios registrados
  // (Aquí puedes conectar luego tu lógica real o almacenamiento local)
  const handleLogin = (e) => {
    e.preventDefault();

    // Simulamos una verificación: Buscamos si el usuario existe
    // (Por ejemplo, si el correo no contiene un registro previo)
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuariosRegistrados.find(user => user.email === email);

    if (!usuarioEncontrado && email !== "admin@edumotion.com") {
      // Si no está registrado, mostramos alerta y redirigimos al registro
      setErrorMessage("No estás registrado. Redirigiendo al formulario de registro...");
      
      setTimeout(() => {
        navigate('/register'); // Redirección automática a la vista de autorregistro
      }, 2000); // Espera 2 segundos para que el usuario lea el mensaje
      
    } else {
      // Lógica normal de inicio de sesión exitoso
      alert("¡Inicio de sesión exitoso!");
      navigate('/courses'); // O al dashboard según el rol
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Iniciar Sesión - Edumotion</h2>
        
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
          >
            Ingresar
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-semibold">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}

