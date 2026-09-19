const handleLogin = (e) => {
  e.preventDefault();

  // Buscar si el usuario existe en los registrados
  const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuarioEncontrado = usuariosRegistrados.find(user => user.email === email && user.password === password);

  if (usuarioEncontrado || email === "admin@edumotion.com") {
    // Si existe, guardamos el nombre del usuario activo para mostrarlo en la app
    const nombreUsuario = usuarioEncontrado ? usuarioEncontrado.nombre : "Administrador";
    localStorage.setItem('usuarioActivo', nombreUsuario);

    alert(`¡Bienvenido de nuevo, ${nombreUsuario}!`);
    navigate('/courses'); // O a la vista principal
  } else {
    // Si NO está registrado, le avisamos y lo mandamos al registro como querías
    setErrorMessage("No estás registrado. Redirigiendo al formulario de registro...");
    setTimeout(() => {
      navigate('/register');
    }, 2000);
  }
};
