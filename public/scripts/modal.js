export function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  if (modal.tagName === "DIALOG" && modal.showModal) {
    modal.showModal();
  } else {
    modal.classList.add("visible");
  }
}

export function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  if (modal.tagName === "DIALOG" && modal.close) {
    modal.close();
  } else {
    modal.classList.remove("visible");
  }
}


