export function openModal(id) {
  const modal = document.getElementById(id);
  const backdrop = document.querySelector(".modal-backdrop");
  if (!modal) return;

  // 🔒 Hide and deactivate other modals
  document.querySelectorAll("dialog").forEach(m => {
    const isTarget = m.id === id;
    m.classList.toggle("hidden", !isTarget);
    m.toggleAttribute("inert", !isTarget);
    if (!isTarget) m.close?.();
  });

  // 🪄 Re-activate modal directly
  modal.classList.remove("hidden");
  modal.removeAttribute("inert"); // ← Important!
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

  // 🔐 Hide modal and remove interactivity
  modal.setAttribute("inert", "");
  modal.classList.add("hidden");

  if (typeof modal.close === "function") {
    modal.close();
  } else {
    modal.classList.remove("visible");
  }

  // 🧼 Hide backdrop
  backdrop?.classList.add("hidden");
}
