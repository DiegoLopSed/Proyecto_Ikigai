$(document).ready(function () {
    // Función para cambiar el color del reloj y la imagen
    function updateClock() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes().toString().padStart(2, '0');
        var seconds = now.getSeconds().toString().padStart(2, '0');
        var time = hours + ":" + minutes + ":" + seconds;

        // Comprobamos si estamos en horario de servicio
        var day = now.getDay(); // 0: domingo, 1: lunes, ..., 6: sábado
        var isOpenTime = (day >= 2 && day <= 6) && (hours >= 12 && hours < 19); // Martes a domingo de 12 PM a 7 PM

        // Cambiar color del reloj y la imagen según el horario
        if (isOpenTime) {
            $('#clock').text(time).removeClass('clock-red').addClass('clock-green');
            $('#status-image').addClass('hidden'); // Ocultar imagen cerrada
            $('#status-image-open').removeClass('hidden'); // Mostrar imagen abierta
        } else {
            $('#clock').text(time).removeClass('clock-green').addClass('clock-red');
            $('#status-image-open').addClass('hidden'); // Ocultar imagen abierta
            $('#status-image').removeClass('hidden'); // Mostrar imagen cerrada
        }
    }

    // Actualizar reloj cada segundo
    setInterval(updateClock, 1000);
    updateClock(); // Inicializa el reloj
});
