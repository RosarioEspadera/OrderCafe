window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("menuBtn")?.addEventListener("click", showMainContent);
  document.getElementById("ordersBtn")?.addEventListener("click", () => openModal("orderModal"));
  document.getElementById("profileBtn")?.addEventListener("click", () => openModal("profileOverlay"));
});
function showMainContent() {
  const mainContent = document.getElementById("mainContent");
  const signInModal = document.getElementById("signInModal");
  const backdrop = document.querySelector(".modal-backdrop");

  if (mainContent) mainContent.classList.remove("hidden");
  if (signInModal) signInModal.classList.remove("visible");
  if (backdrop) backdrop.classList.remove("visible");
}

