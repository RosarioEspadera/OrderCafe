import { lockModalButtons } from './ui.js';

/**
 * Opens a modal by ID and ensures it's fully interactive and focused.
 */
export function openModal(id) {
  const modal = document.getElementById(id);
  const backdrop = document.querySelector(".modal-backdrop");
  if (!modal) return;

  // 🔄 Hide and deactivate all other modals
  document.querySelectorAll("dialog").forEach(m => {
    m.classList.add("hidden");
    m.setAttribute("inert", "");
    m.close?.();
  });

  // 🎯 Activate target modal directly
  modal.classList.remove("hidden");
  modal.removeAttribute("inert");

  if (typeof modal.showModal === "function") {
    modal.showModal();
  } else {
    modal.classList.add("visible");
  }

  // 🔓 Ensure modal buttons respond
  lockModalButtons(false);

  // 🌘 Show backdrop
  backdrop?.classList.remove("hidden");

  // 🎯 Focus first interactive element (optional)
  modal.querySelector(".modal-button")?.focus();

  // 🧪 Confirm modal is interactive
  console.log(`✅ ${id} opened. Inert:`, modal.hasAttribute("inert"));
}

/**
 * Closes a modal by ID and restores main UI.
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

  // 🌘 Hide backdrop
  backdrop?.classList.add("hidden");

  // 🧪 Confirm modal closed
  console.log(`❎ ${id} closed. Inert:`, modal.hasAttribute("inert"));
}
