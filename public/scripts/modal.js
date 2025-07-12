// In modal.js
export function openModal(id) {
  const modal = document.getElementById(id);
  const backdrop = document.querySelector(".modal-backdrop");
  if (modal) modal.style.display = "block";
  if (backdrop) backdrop.classList.add("visible");
}

export function closeModal(id) {
  const modal = document.getElementById(id);
  const backdrop = document.querySelector(".modal-backdrop");
  if (modal) modal.style.display = "none";
  if (backdrop) backdrop.classList.remove("visible");
}

