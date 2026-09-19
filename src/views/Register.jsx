const handleRegister = (e) => {
  e.preventDefault();
  
  // 1. Crear el objeto del nuevo usuario (capturando también el nombre)
  const nuevoUsuario = { nombre, email, password };
  
  // 2. Obtener usuarios previos o iniciar arreglo vacío
  const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
  
  // 3. Guardar el nuevo usuario
  usuariosRegistrados.push(nuevoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));
  
  alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
  navigate('/login');
};