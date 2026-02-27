// Esperamos a que el formulario se envíe
document.getElementById('registroForm').addEventListener('submit', function(event) {
    // Evitamos que la página se recargue automáticamente
    event.preventDefault();

    // Captura de datos usando getElementById
    const email = document.getElementById('correo').value;
    const pass = document.getElementById('password').value;

    // Mostramos los datos en la consola (como pediste)
    console.log("--- Datos de Ingreso ---");
    console.log("Email:", email);
    console.log("Password:", pass); // En la vida real, ¡nunca loguees passwords!

    // Alerta de éxito
    alert("¡Ingreso exitoso! Bienvenido");

    // Redirección directa al index
    window.location.href = "index.html";
});