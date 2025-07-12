document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const orderBtn = document.getElementById("orderBtn");
  const profileBtn = document.getElementById("profileBtn");

  const mainContent = document.getElementById("mainContent");
  const orderModal = document.getElementById("orderModal");
  const profileOverlay = document.getElementById("profileOverlay");

  // 🎨 Show Menu Content
  menuBtn?.addEventListener("click", () => {
    mainContent?.classList.remove("hidden");
  });

  // 🛍️ Show Order Modal
  orderBtn?.addEventListener("click", () => {
    if (orderModal) {
      orderModal.classList.remove("hidden");
      orderModal.showModal?.();
    }
  });

  // 👤 Show Profile Overlay
  profileBtn?.addEventListener("click", () => {
    profileOverlay?.classList.remove("hidden");
  });
});





