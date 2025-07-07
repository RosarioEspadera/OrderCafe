function startAutoScroll() {
  const track = document.querySelector('.carousel-track');
  let scrollInterval = setInterval(() => {
    track.scrollBy({ left: track.clientWidth * 0.8, behavior: 'smooth' });
  }, 4000);

  track.addEventListener('mouseenter', () => clearInterval(scrollInterval));
  track.addEventListener('mouseleave', startAutoScroll);
}

document.addEventListener('DOMContentLoaded', () => {
  initializeOrder();
  initMenuCarousel();
  startAutoScroll();
});
