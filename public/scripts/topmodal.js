document.getElementById("menuBtn").onclick = () => openModal("mainModal");
document.getElementById("ordersBtn").onclick = () => openModal("orderModal");
document.getElementById("profileBtn").onclick = () => openModal("profileOverlay");

function openModal(id) {
  document.getElementById(id)?.classList.add("visible");
  document.querySelector(".modal-backdrop")?.classList.add("visible");
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove("visible");
  document.querySelector(".modal-backdrop")?.classList.remove("visible");
}

