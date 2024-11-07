document.addEventListener("DOMContentLoaded", () => {
    const ratingStars = document.querySelectorAll(".rating .star");
    const ratingValueInput = document.getElementById("rating-value");
    const reviewForm = document.getElementById("review-form");
    const reviewsList = document.getElementById("reviews-list");

    // Cargar las reseñas guardadas en localStorage
    loadReviews();

    // Selección de estrellas
    ratingStars.forEach((star, index) => {
        star.addEventListener("click", () => {
            const value = ratingStars.length - index; // Calcular el valor de derecha a izquierda
            ratingValueInput.value = value;
            updateStarSelection(value);
        });
    });

    function updateStarSelection(value) {
        ratingStars.forEach((star, index) => {
            star.classList.toggle("selected", ratingStars.length - index <= value);
        });
    }

    // Enviar la reseña
    reviewForm.addEventListener("submit", event => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const rating = ratingValueInput.value;
        const reviewText = document.getElementById("review-text").value;

        // Crear un objeto para la reseña
        const newReview = {
            username: username,
            rating: rating,
            reviewText: reviewText
        };

        // Guardar la reseña en localStorage
        saveReview(newReview);

        // Resetear el formulario
        reviewForm.reset();
        ratingValueInput.value = "";
        updateStarSelection(0);
    });

    // Guardar reseña en localStorage
    function saveReview(review) {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.push(review);
        localStorage.setItem("reviews", JSON.stringify(reviews));

        // Volver a cargar las reseñas para mostrarlas
        loadReviews();
    }

    // Cargar las reseñas desde localStorage
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviewsList.innerHTML = ""; // Limpiar las reseñas existentes

        reviews.forEach(review => {
            const reviewItem = document.createElement("div");
            reviewItem.classList.add("card", getCardColorClass(review.rating));
            reviewItem.innerHTML = `
                <h5>${review.username}</h5>
                <div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                <p>${review.reviewText}</p>
            `;

            reviewsList.appendChild(reviewItem);
        });
    }

    // Función para obtener la clase de color de la tarjeta según la calificación
    function getCardColorClass(rating) {
        if (rating == 5) {
            return "bg-success";  // Verde para 5 estrellas
        } else if (rating == 4) {
            return "bg-info";     // Azul para 4 estrellas
        } else if (rating == 3) {
            return "bg-warning";  // Amarillo para 3 estrellas
        } else if (rating == 2) {
            return "bg-danger";   // Rojo para 2 estrellas
        } else {
            return "bg-secondary"; // Gris para 1 estrella
        }
    }
});
