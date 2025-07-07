// 🌟 Initialize carousel setup
function initMenuCarousel() {
  const track = document.querySelector('.carousel-track');
  if (!track) return;

  // Scroll to the beginning (just in case)
  track.scrollTo({ left: 0, behavior: 'smooth' });

  // Optional: Setup additional carousel features here, like indicators or touch events
  // Example placeholder:
  // const items = track.querySelectorAll('.carousel-item');
  // items.forEach((item, index) => {
  //   item.setAttribute('data-index', index);
  // });
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
  initializeOrder();       // 🍽️ Custom order setup
  initMenuCarousel();      // 🎡 Now safely defined
  startAutoScroll();       // 🕒 Begin the loop
});


