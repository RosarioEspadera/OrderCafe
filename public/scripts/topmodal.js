document.addEventListener("DOMContentLoaded", () => {
  // 📦 Get references
  const menuBtn = document.getElementById("menuBtn");
  const ordersBtn = document.getElementById("ordersBtn");
  const profileBtn = document.getElementById("profileBtn");

  const orderModal = document.getElementById("orderModal");
  const profileOverlay = document.getElementById("profileOverlay");
  const mainContent = document.getElementById("mainContent"); // If needed for Menu

  // 🍽 Menu Button shows main content
  menuBtn.addEventListener("click", () => {
    mainContent.classList.remove("hidden");
  });

  // 🧾 Orders Button opens dialog
  ordersBtn.addEventListener("click", () => {
    orderModal.showModal?.();
    orderModal.classList.remove("hidden"); // fallback if dialog doesn't support showModal
  });

  // 👤 Profile Button shows overlay
  profileBtn.addEventListener("click", () => {
    profileOverlay.classList.remove("hidden");
    profileOverlay.style.display = "block";
  });
});




