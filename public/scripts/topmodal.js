document.addEventListener("DOMContentLoaded", () => {
  // 🌟 Buttons
  const menuBtn = document.getElementById("menuBtn");
  const orderBtn = document.getElementById("orderBtn");
  const profileBtn = document.getElementById("profileBtn");

  // 📦 Sections
  const mainContent = document.getElementById("mainContent");
  const orderModal = document.getElementById("orderModal");
  const profileOverlay = document.getElementById("profileOverlay");

  const backdrop = document.querySelector(".modal-backdrop");

  // 🧁 Show Menu Section
  menuBtn?.addEventListener("click", () => {
    mainContent?.classList.remove("hidden");
    mainContent?.scrollIntoView({ behavior: "smooth" });
  });

  // 🛒 Toggle Order Modal
  orderBtn?.addEventListener("click", () => {
    if (!orderModal) return;

    if (orderModal.tagName === "DIALOG") {
      orderModal.showModal?.();
    } else {
      orderModal.classList.add("visible");
      backdrop?.classList.add("visible");
    }
  });

  // 👤 Show Profile Overlay
  profileBtn?.addEventListener("click", () => {
    if (!profileOverlay) return;

    if (profileOverlay.tagName === "DIALOG") {
      profileOverlay.showModal?.();
    } else {
      profileOverlay.classList.remove("hidden");
      profileOverlay.style.display = "block";
    }
  });

  // 🔐 ESC key closes modals
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;

    // Close visible dialog modals
    document.querySelectorAll("dialog[open]")?.forEach(modal => {
      modal.close?.();
    });

    // Close custom modals
    document.querySelectorAll(".modal.visible")?.forEach(modal => {
      modal.classList.remove("visible");
    });

    backdrop?.classList.remove("visible");

    // Close overlays
    profileOverlay?.classList.add("hidden");
    profileOverlay.style.display = "none";
  });
});






