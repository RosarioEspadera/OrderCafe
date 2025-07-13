import { lockModalButtons } from './ui.js';

/**
 * Opens a modal by ID and ensures it's interactive.
 */
export function openModal(id) {
  const modal = document.getElementById(id);
  const backdrop = document.querySelector(".modal-backdrop");
  if (!modal) return;

  // 🔄 Deactivate all modals except the one being opened
  document.querySelectorAll("dialog").forEach(m => {
    if (m.id !== id) {
      m.classList.add("hidden");
      m.setAttribute("inert", "");
      m.close?.();
    }
  });

  // ✨ Activate target modal
  modal.classList.remove("hidden");
  modal.removeAttribute("inert");
  lockModalButtons(false);

  if (typeof modal.showModal === "function") {
    modal.showModal();
  } else {
    modal.classList.add("visible");
  }

  backdrop?.classList.remove("hidden");
  modal.querySelector(".modal-button")?.focus();

  console.log(`✅ ${id} opened. Inert:`, modal.hasAttribute("inert"));
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
