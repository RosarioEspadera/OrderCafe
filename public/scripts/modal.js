import { lockModalButtons } from './ui.js';

/**
 * Opens a modal by ID and ensures it's interactive.
 */
export function openModal(id) {
  const modal = document.getElementById(id);
  const backdrop = document.querySelector(".modal-backdrop");
  if (!modal) return;

  // 🔒 Close all other modals first
  document.querySelectorAll("dialog").forEach(m => {
    if (m.id !== id) {
      m.classList.add("hidden");
      m.setAttribute("inert", "");
      m.close?.();
    }
  });

  // 🔓 Activate the target modal
  modal.classList.remove("hidden");
  modal.removeAttribute("inert");
  if (typeof modal.showModal === "function") modal.showModal();
  lockModalButtons(false);
  backdrop?.classList.remove("hidden");
}


/**
 * Closes a modal by ID.
 */
export function closeModal(id) {
  const modal = document.getElementById(id);
  const backdrop = document.querySelector(".modal-backdrop");
  if (!modal) return;

  modal.setAttribute("inert", "");
  modal.classList.add("hidden");

  if (typeof modal.close === "function") {
    modal.close();
  } else {
    modal.classList.remove("visible");
  }

  backdrop?.classList.add("hidden");
  console.log(`❎ ${id} closed. Inert:`, modal.hasAttribute("inert"));
}
