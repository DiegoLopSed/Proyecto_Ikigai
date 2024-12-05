document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("register-form");
    const membershipSelect = document.getElementById("membership-level");
    const addressContainer = document.getElementById("address-container");
    const submitButton = document.getElementById("submit-btn");

    // Validación de los campos
    function validateField(field, feedbackId) {
        const value = field.value.trim();
        if (value === "") {
            field.classList.add("invalid");
            document.getElementById(feedbackId).style.display = "block";
            return false;
        } else {
            field.classList.remove("invalid");
            field.classList.add("valid");
            document.getElementById(feedbackId).style.display = "none";
            return true;
        }
    }

    // Mostrar u ocultar el campo de dirección según el tipo de membresía
    membershipSelect.addEventListener("change", function () {
        if (membershipSelect.value === "premium") {
            addressContainer.style.display = "block";
        } else {
            addressContainer.style.display = "none";
        }
    });

    // Validación del formulario al enviarlo
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let isFormValid = true;

        // Validación de cada campo
        isFormValid &= validateField(document.getElementById("name"), "name-feedback");
        isFormValid &= validateField(document.getElementById("phone"), "phone-feedback");
        isFormValid &= validateField(document.getElementById("email"), "email-feedback");

        if (membershipSelect.value === "premium") {
            isFormValid &= validateField(document.getElementById("address"), "address-feedback");
        }

        // Si el formulario es válido, mostramos el mensaje de éxito
        if (isFormValid) {
            alert("¡Membresía registrada con éxito!");
            form.reset();
        } else {
            alert("Por favor, completa todos los campos correctamente.");
        }
    });
});
