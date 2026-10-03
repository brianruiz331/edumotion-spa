import React, { useState } from 'react';
import api from '../services/api'; // Importa la conexión que configuramos

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Hacemos la petición POST a la ruta que creamos en el backend (/users/create)
            const response = await api.post('/users/create', formData);
            
            alert('¡Usuario registrado con éxito!');
            console.log(response.data);
            
            // Opcional: Redirigir al login o limpiar formulario
        } catch (error) {
            console.error('Error al registrarse:', error.response?.data?.message || error.message);
            alert('Hubo un error al registrar el usuario.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registro en Edumotion</h2>
            <input 
                type="text" 
                name="name" 
                placeholder="Nombre completo" 
                value={formData.name} 
                onChange={handleChange} 
                required 
            />
            <input 
                type="email" 
                name="email" 
                placeholder="Correo electrónico" 
                value={formData.email} 
                onChange={handleChange} 
                required 
            />
            <input 
                type="password" 
                name="password" 
                placeholder="Contraseña" 
                value={formData.password} 
                onChange={handleChange} 
                required 
            />
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default Register;