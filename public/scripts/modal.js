export function openModal(id) {
  const modal = document.getElementById(id);
  const backdrop = document.querySelector(".modal-backdrop");

  if (!modal) return;

  // 🔐 Accessibility: Deactivate other modals
  document.querySelectorAll("dialog").forEach(m => {
    if (m.id !== id) {
      m.classList.add("hidden");
      m.setAttribute("inert", "");
      m.close?.();
    } else {
      m.removeAttribute("inert");
    }
  });

  // 🎯 Show target modal
  modal.classList.remove("hidden");
  modal.removeAttribute("inert");

  if (typeof modal.showModal === "function") {
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

  // 🔐 Accessibility: Hide and disable modal
  modal.setAttribute("inert", "");
  modal.classList.add("hidden");

  if (typeof modal.close === "function") {
    modal.close();
  } else {
    modal.classList.remove("visible");
  }

  backdrop?.classList.add("hidden");
}
