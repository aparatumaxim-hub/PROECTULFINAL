function mobileMenu() {
    var x = document.getElementsByTagName("navbar")[0];
    if (x.className === "") {
        x.className += "mobile";
    } else {
        x.className = "";
    }
}

// Selectăm elementele
const reviewForm = document.getElementById('review-form');
const reviewsList = document.getElementById('reviews-list');

// 1. Funcția care încarcă recenziile salvate când se deschide pagina
window.addEventListener('DOMContentLoaded', () => {
    const savedReviews = JSON.parse(localStorage.getItem('myReviews')) || [];
    savedReviews.forEach(review => renderReview(review));
});

// 2. Funcția pentru afișarea unei recenzii în HTML
function renderReview(data) {
    const reviewItem = document.createElement('div');
    reviewItem.classList.add('review-item');
    let stars = '⭐'.repeat(data.rating);

    reviewItem.innerHTML = `
        <strong>${data.name}</strong> <span style="color: #ffc107;">${stars}</span>
        <p style="margin: 5px 0 0; color: #555;">${data.comment}</p>
        <small style="color: #999;">${data.date}</small>
    `;

    // Ștergem mesajul "fără recenzii"
    const noReviewsMsg = document.querySelector('.no-reviews');
    if (noReviewsMsg) noReviewsMsg.remove();

    reviewsList.prepend(reviewItem);
}

// 3. Evenimentul de trimitere a formularului
reviewForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const newReview = {
        name: document.getElementById('username').value,
        rating: document.getElementById('rating').value,
        comment: document.getElementById('comment').value,
        date: new Date().toLocaleDateString('ro-RO')
    };

    // Salvăm în LocalStorage
    const savedReviews = JSON.parse(localStorage.getItem('myReviews')) || [];
    savedReviews.push(newReview);
    localStorage.setItem('myReviews', JSON.stringify(savedReviews));

    // Afișăm pe ecran
    renderReview(newReview);

    // Resetăm formularul
    reviewForm.reset();
});