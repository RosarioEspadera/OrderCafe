window.addEventListener("DOMContentLoaded", () => {
 document.getElementById("ordersBtn")?.addEventListener("click", () => openModal("orderModal"));  // ✅ 'orderModal' with an 'L'
document.getElementById("profileBtn")?.addEventListener("click", () => openModal("profileOverlay"));
document.getElementById("menuBtn")?.addEventListener("click", showMainContent);

});
function showMainContent() {
  const mainContent = document.getElementById("mainContent");
  const signInModal = document.getElementById("signInModal");
  const backdrop = document.querySelector(".modal-backdrop");

  if (mainContent) mainContent.classList.remove("hidden");
  if (signInModal) signInModal.classList.remove("visible");
  if (backdrop) backdrop.classList.remove("visible");
}
function openModal(modalId) {
  // Close visible modals
  document.querySelectorAll("dialog.visible").forEach(modal => {
    modal.classList.remove("visible");
  });

  // Hide mainContent when showing a modal
  const mainContent = document.getElementById("mainContent");
  if (mainContent) mainContent.classList.add("hidden");

  // Show the requested modal
  const modal = document.getElementById(modalId);
  const backdrop = document.querySelector(".modal-backdrop");
  if (modal) modal.classList.add("visible");
  if (backdrop) backdrop.classList.add("visible");
}



