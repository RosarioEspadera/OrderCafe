// 🌟 Initialize carousel setup
function initMenuCarousel() {
  const track = document.querySelector('.carousel-track');
  if (!track) return;

  // Scroll to the beginning (just in case)
  track.scrollTo({ left: 0, behavior: 'smooth' });

}

// 🎞️ Enable auto-scroll with pause on hover
function startAutoScroll() {
  const track = document.querySelector('.carousel-track');
  if (!track) return;

  let scrollInterval = setInterval(() => {
    track.scrollBy({ left: track.clientWidth * 0.8, behavior: 'smooth' });
  }, 4000);

  track.addEventListener('mouseenter', () => clearInterval(scrollInterval));
  track.addEventListener('mouseleave', startAutoScroll);
}

// 🚀 Wait for DOM before running scripts
document.addEventListener('DOMContentLoaded', () => {
  initMenuCarousel();      // 🎡 Now safely defined
  startAutoScroll();       // 🕒 Begin the loop
});
document.getElementById('confirmOrder').addEventListener('click', () => {
  alert('Order Confirmed! ☕');
});



