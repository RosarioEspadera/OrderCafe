import { lockModalButtons } from './ui.js';

/**
 * Opens a modal by ID, ensuring it's fully interactive and focused.
 */
export function openModal(id) {
  const modal = document.getElementById(id);
  const backdrop = document.querySelector(".modal-backdrop");
  if (!modal) return;

  // 🔄 Close and disable other modals
  document.querySelectorAll("dialog").forEach(m => {
    const isTarget = m.id === id;
    m.classList.toggle("hidden", !isTarget);
    m.toggleAttribute("inert", !isTarget);
    if (!isTarget) m.close?.();
  });

  // 🎯 Reactivate modal directly
  modal.classList.remove("hidden");
  modal.removeAttribute("inert");

  if (typeof modal.showModal === "function") {
    modal.showModal();
  } else {
    modal.classList.add("visible");
  }

  // 🖱️ Make sure buttons are clickable again
  lockModalButtons(false);

  // 🌘 Show backdrop
  backdrop?.classList.remove("hidden");

  // 🧭 Optional: set focus to first interactive element
  modal.querySelector(".modal-button")?.focus();
}

/**
 * Closes a modal by ID and hides backdrop.
 */
export function closeModal(id) {
  const modal = document.getElementById(id);
  const backdrop = document.querySelector(".modal-backdrop");
  if (!modal) return;

  // 🔒 Disable interaction
  modal.setAttribute("inert", "");
  modal.classList.add("hidden");

  if (typeof modal.close === "function") {
    modal.close();
  } else {
    modal.classList.remove("visible");
  }

  // 🌘 Hide backdrop
  backdrop?.classList.add("hidden");
}
