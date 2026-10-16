import React, { useEffect, useState } from 'react';
import { peticionAPI } from '../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estados para los modales de Ver y Editar
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ id: '', name: '', email: '' });

  const [currentUser, setCurrentUser] = useState({
    name: 'Brian Camilo Ruiz Ramos',
    email: 'brianruizbarcelona@gmail.com',
    role: 'Admin'
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setCurrentUser(parsedUser);

        // 🌟 VALIDACIÓN DE SEGURIDAD: Bloquear acceso si no es admin
        if (parsedUser.role !== 'admin') {
          alert('Acceso denegado: No tienes permisos de administrador.');
          window.location.href = '/courses'; // Redirige a cursos si es un usuario común
          return;
        }
      } catch (e) {
        console.error("Error al leer el usuario guardado");
        window.location.href = '/login';
      }
    } else {
      window.location.href = '/login';
    }
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await peticionAPI.get('/users');
      // Manejamos si la respuesta viene directa o dentro de data
      const data = response.data.users || response.data;
      setUsers(Array.isArray(data) ? data : []);
      setError('');
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
      setError('No se pudo cargar la lista de usuarios desde el servidor.');
    } finally {
      setLoading(false);
    }
  };

  // 1. ACCIÓN ELIMINAR (Conectada a la base de datos)
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario de la base de datos?')) {
      try {
        await peticionAPI.delete(`/users/${id}`);
        setUsers(users.filter(user => user.id !== id));
        alert('Usuario eliminado correctamente de la base de datos');
      } catch (err) {
        console.error('Error al eliminar:', err);
        alert('No se pudo eliminar el usuario desde el servidor.');
      }
    }
  };

  // 2. ACCIÓN VER
  const handleView = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  // 3. ACCIÓN EDITAR (Abrir modal)
  const handleEditClick = (user) => {
    setEditForm({ id: user.id, name: user.name, email: user.email });
    setIsEditModalOpen(true);
  };

  // Guardar cambios de edición (Conectado a la base de datos y actualización en tiempo real)
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await peticionAPI.put(`/users/${editForm.id}`, { 
        name: editForm.name, 
        email: editForm.email 
      });
      
      // Actualizar la tabla local de forma inmediata
      setUsers(users.map(u => u.id === editForm.id ? { ...u, name: editForm.name, email: editForm.email } : u));
      
      // Si el usuario editado es el mismo que tiene la sesión activa, actualizar cabecera y localStorage
      if (currentUser && currentUser.id === editForm.id) {
        const updatedCurrentUser = {
          ...currentUser,
          name: editForm.name,
          email: editForm.email
        };
        setCurrentUser(updatedCurrentUser);
        localStorage.setItem('user', JSON.stringify(updatedCurrentUser));
      }

      setIsEditModalOpen(false);
      alert('Usuario actualizado con éxito en la base de datos');
    } catch (err) {
      console.error('Error al actualizar:', err);
      alert('No se pudo actualizar el usuario en el servidor.');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', margin: 0, padding: 0 }}>
      
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '15px 30px', borderBottom: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', color: '#1e293b' }}>Sistema de Información Web</h2>
          <span style={{ backgroundColor: '#8b5cf6', color: '#fff', padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>Admin Panel</span>
        </div>

        <div style={{ display: 'flex', backgroundColor: '#f1f5f9', padding: '4px', borderRadius: '20px', gap: '5px' }}>
          <button 
            onClick={() => setActiveTab('dashboard')}
            style={{ padding: '6px 18px', border: 'none', borderRadius: '16px', cursor: 'pointer', backgroundColor: activeTab === 'dashboard' ? '#6366f1' : 'transparent', color: activeTab === 'dashboard' ? '#fff' : '#64748b', fontWeight: '500', transition: 'all 0.2s' }}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            style={{ padding: '6px 18px', border: 'none', borderRadius: '16px', cursor: 'pointer', backgroundColor: activeTab === 'users' ? '#6366f1' : 'transparent', color: activeTab === 'users' ? '#fff' : '#64748b', fontWeight: '500', transition: 'all 0.2s' }}
          >
            Usuarios
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1e293b' }}>{currentUser.name}</div>
            <div style={{ fontSize: '11px', color: '#ef4444', fontWeight: 'bold' }}>{currentUser.role || 'Admin'}</div>
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem('user');
              localStorage.removeItem('session_token');
              window.location.href = '/login';
            }} 
            style={{ padding: '8px 14px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', transition: 'transform 0.1s' }}
            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '30px' }}>
        {activeTab === 'dashboard' ? (
          <div>
            <div style={{ marginBottom: '25px' }}>
              <h1 style={{ margin: '0 0 5px 0', fontSize: '24px', color: '#1e293b' }}>¡Bienvenido, {currentUser.name.split(' ')[0]}!</h1>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>Este es tu panel de administración conectado a MySQL</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ fontSize: '24px', backgroundColor: '#f1f5f9', padding: '12px', borderRadius: '8px' }}>👥</div>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b' }}>{users.length || 1}</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Usuarios Registrados</div>
                </div>
              </div>

              <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ fontSize: '24px', backgroundColor: '#f1f5f9', padding: '12px', borderRadius: '8px' }}>📊</div>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b' }}>12</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Visitas Hoy</div>
                </div>
              </div>

              <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ fontSize: '24px', backgroundColor: '#f1f5f9', padding: '12px', borderRadius: '8px' }}>🟢</div>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b' }}>1</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Sesiones Activas</div>
                </div>
              </div>

              <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ fontSize: '24px', backgroundColor: '#f1f5f9', padding: '12px', borderRadius: '8px' }}>📈</div>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b' }}>100%</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Tasa de Éxito</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Pestaña de Usuarios */
          <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, color: '#1e293b', fontSize: '20px' }}>Gestión de Usuarios</h2>
              <button 
                onClick={fetchUsers} 
                style={{ padding: '8px 14px', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '13px', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#4f46e5'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#6366f1'}
              >
                🔄 Actualizar Tabla
              </button>
            </div>

            {loading && <p style={{ color: '#64748b' }}>Cargando usuarios desde la base de datos...</p>}
            {error && <p style={{ color: '#ef4444' }}>{error}</p>}

            {!loading && !error && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#6366f1', color: '#fff' }}>
                      <th style={{ padding: '12px', borderTopLeftRadius: '6px' }}>ID</th>
                      <th style={{ padding: '12px' }}>Nombre</th>
                      <th style={{ padding: '12px' }}>Email</th>
                      <th style={{ padding: '12px' }}>Registro</th>
                      <th style={{ padding: '12px', borderTopRightRadius: '6px', textAlign: 'center' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <tr key={user.id || index} style={{ borderBottom: '1px solid #e2e8f0', transition: 'background 0.15s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                          <td style={{ padding: '12px', fontWeight: 'bold', color: '#64748b' }}>#{user.id}</td>
                          <td style={{ padding: '12px', color: '#1e293b', fontWeight: '500' }}>{user.name}</td>
                          <td style={{ padding: '12px', color: '#64748b' }}>{user.email}</td>
                          <td style={{ padding: '12px', color: '#64748b', fontSize: '13px' }}>
                            {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Reciente'}
                          </td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                              {/* Botón Ver */}
                              <button 
                                onClick={() => handleView(user)}
                                title="Ver detalles" 
                                style={{ padding: '6px 10px', backgroundColor: '#3b82f6', border: 'none', borderRadius: '4px', cursor: 'pointer', color: '#fff', transition: 'transform 0.15s, background 0.15s' }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.backgroundColor = '#2563eb'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.backgroundColor = '#3b82f6'; }}
                              >
                                👁️
                              </button>

                              {/* Botón Editar */}
                              <button 
                                onClick={() => handleEditClick(user)}
                                title="Editar usuario" 
                                style={{ padding: '6px 10px', backgroundColor: '#f59e0b', border: 'none', borderRadius: '4px', cursor: 'pointer', color: '#fff', transition: 'transform 0.15s, background 0.15s' }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.backgroundColor = '#d97706'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.backgroundColor = '#f59e0b'; }}
                              >
                                ✏️
                              </button>

                              {/* Botón Eliminar */}
                              <button 
                                onClick={() => handleDelete(user.id)}
                                title="Eliminar usuario" 
                                style={{ padding: '6px 10px', backgroundColor: '#ef4444', border: 'none', borderRadius: '4px', cursor: 'pointer', color: '#fff', transition: 'transform 0.15s, background 0.15s' }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.backgroundColor = '#dc2626'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.backgroundColor = '#ef4444'; }}
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>
                          No hay usuarios registrados en la base de datos.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL VER DETALLES */}
      {isViewModalOpen && selectedUser && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', width: '400px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#1e293b' }}>Detalles del Usuario</h3>
            <p><strong>ID:</strong> #{selectedUser.id}</p>
            <p><strong>Nombre:</strong> {selectedUser.name}</p>
            <p><strong>Correo:</strong> {selectedUser.email}</p>
            <p><strong>Fecha Registro:</strong> {selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleString() : 'N/A'}</p>
            <button 
              onClick={() => setIsViewModalOpen(false)}
              style={{ marginTop: '15px', width: '100%', padding: '8px', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* MODAL EDITAR USUARIO */}
      {isEditModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', width: '400px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#1e293b' }}>Editar Usuario</h3>
            <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#475569' }}>Nombre</label>
                <input 
                  type="text" 
                  value={editForm.name} 
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px', color: '#475569' }}>Correo Electrónico</label>
                <input 
                  type="email" 
                  value={editForm.email} 
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  required
                  style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)}
                  style={{ flex: 1, padding: '8px', backgroundColor: '#94a3b8', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  style={{ flex: 1, padding: '8px', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;