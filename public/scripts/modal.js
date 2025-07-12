export function openModal(id) {
  const modal = document.getElementById(id);
  const backdrop = document.querySelector(".modal-backdrop");

  if (!modal) return;

  // Accessibility improvement
  modal.setAttribute("aria-hidden", "false");

  // Force hide other modals
  document.querySelectorAll("dialog").forEach(m => {
    if (m.id !== id) {
      m.classList.add("hidden");
      m.close?.();
    }
  });

  // Toggle visibility
  if (modal.tagName === "DIALOG" && typeof modal.showModal === "function") {
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

  // Accessibility improvement
  modal.setAttribute("aria-hidden", "true");

  if (modal.tagName === "DIALOG" && typeof modal.close === "function") {
    modal.close();
    modal.classList.add("hidden");
  } else {
    modal.classList.remove("visible");
  }

  backdrop?.classList.add("hidden");
}



