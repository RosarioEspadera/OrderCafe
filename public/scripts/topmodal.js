document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const ordersBtn = document.getElementById("ordersBtn");
  const profileBtn = document.getElementById("profileBtn");
  const orderModal = document.getElementById("orderModal");
  const profileOverlay = document.getElementById("profileOverlay");
  const mainContent = document.getElementById("mainContent");

  if (menuBtn && mainContent) {
    menuBtn.addEventListener("click", () => {
      mainContent.classList.remove("hidden");
    });
  }

  if (ordersBtn && orderModal) {
    ordersBtn.addEventListener("click", () => {
      orderModal.showModal?.();
      orderModal.classList.remove("hidden");
    });
  }

  if (profileBtn && profileOverlay) {
    profileBtn.addEventListener("click", () => {
      profileOverlay.classList.remove("hidden");
      profileOverlay.style.display = "block";
    });
  }
});




