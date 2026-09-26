const stars = document.querySelectorAll(".star");
const result = document.querySelector(".rating-result");
const preview = document.querySelector(".rating-preview");
const ratingLabels = ["Poor", "Fair", "Good", "Very good", "Excellent"];

let selectedRating = 0;
let hoveredRating = 0;

function showStars() {
  const visibleRating = hoveredRating || selectedRating;

  stars.forEach((star) => {
    const rating = Number(star.dataset.rating);
    star.classList.toggle("is-filled", rating <= visibleRating);
    star.setAttribute("aria-pressed", String(rating === selectedRating));
  });
}

stars.forEach((star) => {
  const rating = Number(star.dataset.rating);

  star.addEventListener("pointerenter", () => {
    hoveredRating = rating;
    preview.textContent = ratingLabels[rating - 1];
    showStars();
  });

  star.addEventListener("focus", () => {
    hoveredRating = rating;
    preview.textContent = ratingLabels[rating - 1];
    showStars();
  });

  star.addEventListener("click", () => {
    selectedRating = rating;
    result.textContent = `${rating} out of 5 · ${ratingLabels[rating - 1]}`;
    showStars();
  });
});

document.querySelector(".stars").addEventListener("pointerleave", () => {
  hoveredRating = 0;
  preview.textContent = "";
  showStars();
});

document.querySelector(".stars").addEventListener("focusout", (event) => {
  if (!event.currentTarget.contains(event.relatedTarget)) {
    hoveredRating = 0;
    preview.textContent = "";
    showStars();
  }
});