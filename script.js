const btn = document.getElementById('button');

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Verificar que todos los campos estén completos
    const inputs = this.querySelectorAll('input, textarea, select'); // Incluye también el campo select de servicios
    let allFilled = true;

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            allFilled = false; // Si un campo está vacío, marcar como falso
        }
    });

    // Si no se ingresó toda la información, mostrar alerta y detener el envío
    if (!allFilled) {
        alert('Por favor, ingrese toda la información requerida.');
        return;
    }

    // Continuar con el envío si todos los campos están completos
    btn.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_xplxxmi';

    emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
        btn.value = 'Mensaje enviado correctamente';
        alert('¡Da clic en aceptar!');

        // Limpiar el formulario
        this.reset(); // Resetea todos los campos del formulario

        // Cambiar el botón de nuevo a "Enviar" después de 3 segundos
        setTimeout(() => {
            btn.value = 'Enviar';
        }, 3000); // 3000 milisegundos = 3 segundos
    }, (err) => {
        btn.value = 'Enviar';
        alert(JSON.stringify(err));
    });
});
