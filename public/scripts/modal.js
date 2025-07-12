export function openModal(id) {
  const modal = document.getElementById(id);
  const backdrop = document.querySelector(".modal-backdrop");

  if (!modal) return;

  if (modal.tagName === "DIALOG" && modal.showModal) {
    modal.classList.remove("hidden");
    modal.showModal();
  } else {
    modal.classList.add("visible");
  }

  backdrop?.classList.remove("hidden");
}

export function closeModal(id) {
  const modal = document.getElementById(id);
  const backdrop = document.querySelector(".modal-backdrop");

  if (!modal) return;

  if (modal.tagName === "DIALOG" && modal.close) {
    modal.close();
    modal.classList.add("hidden"); // optional if you use this in styles
  } else {
    modal.classList.remove("visible");
  }

  backdrop?.classList.add("hidden");
}



