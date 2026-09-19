import React, { useEffect, useState } from 'react';

export default function AdminUsers() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Petición al json-server (asegúrate de que el puerto sea el correcto, por defecto suele ser 3000 o 5000)
    fetch('http://localhost:3000/users')
      .then((res) => res.json())
      .then((data) => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Panel de Administración - Usuarios Registrados</h2>

        {loading ? (
          <p className="text-gray-600 text-center py-4">Cargando usuarios desde la base de datos...</p>
        ) : usuarios.length === 0 ? (
          <p className="text-gray-600 text-center py-4">No hay usuarios registrados en el sistema.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white text-left">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Correo Electrónico</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50 transition duration-150">
                    <td className="py-3 px-4 text-gray-700 font-medium">{user.id}</td>
                    <td className="py-3 px-4 text-gray-600">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}