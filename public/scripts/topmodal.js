window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("menuBtn")?.addEventListener("click", () => openModal("mainModal"));
  document.getElementById("ordersBtn")?.addEventListener("click", () => openModal("orderModal"));
  document.getElementById("profileBtn")?.addEventListener("click", () => openModal("profileOverlay"));
});
function openModal(id) {
  const modal = document.getElementById(id);
  const backdrop = document.querySelector(".modal-backdrop");

  if (modal) modal.classList.add("visible");
  if (backdrop) backdrop.classList.add("visible");
}
