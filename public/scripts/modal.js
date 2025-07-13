import { lockModalButtons } from './ui.js';

/**
 * Opens a modal by ID and ensures it's interactive.
 */
export function openModal(id) {
  const modal = document.getElementById(id);
  const backdrop = document.querySelector(".modal-backdrop");
  if (!modal) return;

  // 🚫 Lock and hide other modals first
  document.querySelectorAll("dialog").forEach(m => {
    if (m.id !== id) {
      m.classList.add("hidden");
      m.setAttribute("inert", "");
      m.close?.();
    }
  });

  modal.classList.remove("hidden");
  backdrop?.classList.remove("hidden");
  lockModalButtons(false);

  // ✅ Safely remove inert after rendering
  requestAnimationFrame(() => {
    modal.removeAttribute("inert");

    if (typeof modal.showModal === "function") {
      modal.showModal();
    } else {
      modal.classList.add("visible");
    }

    modal.querySelector(".modal-button, button")?.focus();

    console.log("Modal now interactive:", {
      id: modal.id,
      inert: modal.hasAttribute("inert"),
      visible: !modal.classList.contains("hidden")
    });
  });
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
