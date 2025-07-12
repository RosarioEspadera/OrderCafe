document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const orderBtn = document.getElementById("orderBtn");
  const profileBtn = document.getElementById("profileBtn");

  const mainContent = document.getElementById("mainContent");
  const orderModal = document.getElementById("orderModal");
  const profileOverlay = document.getElementById("profileOverlay");

  // 🍽️ Show Menu Content Section
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
      document.querySelector(".modal-backdrop")?.classList.add("visible");
    }
  });

  // 🧍 Show Profile Overlay
  profileBtn?.addEventListener("click", () => {
    if (!profileOverlay) return;

    if (profileOverlay.tagName === "DIALOG") {
      profileOverlay.showModal?.();
    } else {
      profileOverlay.classList.remove("hidden");
      profileOverlay.style.display = "block";
    }
  });

  // 🔐 Optional: Close All Modals on ESC Key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.visible")?.forEach(modal => {
        modal.classList.remove("visible");
      });
      document.querySelector(".modal-backdrop")?.classList.remove("visible");

      document.querySelectorAll("dialog[open]")?.forEach(dialog => dialog.close?.());
    }
  });
});






