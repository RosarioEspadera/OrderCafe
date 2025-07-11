window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("menuBtn")?.addEventListener("click", () => openModal("mainModal"));
  document.getElementById("ordersBtn")?.addEventListener("click", () => openModal("orderModal"));
  document.getElementById("profileBtn")?.addEventListener("click", () => openModal("profileOverlay"));
});
