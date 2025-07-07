function startAutoScroll() {
  const track = document.querySelector('.carousel-track');

  if (!track) return; // 🚧 Prevent errors if the element doesn't exist

  let scrollInterval = setInterval(() => {
    track.scrollBy({ left: track.clientWidth * 0.8, behavior: 'smooth' });
  }, 4000);

  track.addEventListener('mouseenter', () => clearInterval(scrollInterval));
  track.addEventListener('mouseleave', startAutoScroll);
}

document.addEventListener('DOMContentLoaded', () => {
  initializeOrder();   // ✅ Keep your existing order initialization
  // Removed initMenuCarousel(); to avoid ReferenceError
  startAutoScroll();   // ✅ Start your carousel animation
});

