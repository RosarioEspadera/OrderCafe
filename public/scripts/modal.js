// In modal.js
export function openModal(id) {
  document.getElementById(id)?.style.display = "block";
}

export function closeModal(id) {
  document.getElementById(id)?.style.display = "none";
}
