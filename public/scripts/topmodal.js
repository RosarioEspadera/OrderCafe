function openModal(id) {
  document.getElementById(id)?.classList.add("visible");
  document.querySelector(".modal-backdrop")?.classList.add("visible");
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove("visible");
  document.querySelector(".modal-backdrop")?.classList.remove("visible");
}

