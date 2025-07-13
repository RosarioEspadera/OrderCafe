export function openModal(id) {
  const modal = document.getElementById(id);
  const backdrop = document.querySelector(".modal-backdrop");
  if (!modal) return;

  // 🔒 Deactivate other modals
  document.querySelectorAll("dialog").forEach(m => {
    const isTarget = m.id === id;
    m.classList.toggle("hidden", !isTarget);
    m.toggleAttribute("inert", !isTarget);
    if (!isTarget) m.close?.();
  });

  // 🎯 Activate target modal
  modal.classList.remove("hidden");
  modal.removeAttribute("inert");

  if (typeof modal.showModal === "function") {
    modal.showModal();
  } else {
    modal.classList.add("visible");
  }

  // 🎭 Show backdrop
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
