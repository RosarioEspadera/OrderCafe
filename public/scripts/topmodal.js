document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const orderBtn = document.getElementById("orderBtn");
  const profileBtn = document.getElementById("profileBtn");
  const closeProfileBtn = document.getElementById("closeProfile");
  const closeOrderModalBtn = document.getElementById("closeOrderModal");

  const mainContent = document.getElementById("mainContent");
  const orderModal = document.getElementById("orderModal");
  const profileOverlay = document.getElementById("profileOverlay");
  const backdrop = document.querySelector(".modal-backdrop");

  const productOrderButtons = document.querySelectorAll(".order-button");

  // Disable product interaction when in mainContent
  const toggleProductButtons = (isEnabled) => {
    productOrderButtons?.forEach(btn => {
      btn.disabled = !isEnabled;
    });
  };

  // Open Menu and disable product buttons
  menuBtn?.addEventListener("click", () => {
    mainContent?.classList.remove("hidden");
    mainContent?.scrollIntoView({ behavior: "smooth" });
    toggleProductButtons(false); // lock product buttons while viewing menu
  });

  // Open Order Modal
  orderBtn?.addEventListener("click", () => {
    toggleProductButtons(true); // re-enable before opening
    orderModal?.showModal();
    backdrop?.classList.remove("hidden");
  });

  // Open Profile Modal
  profileBtn?.addEventListener("click", () => {
    toggleProductButtons(true);
    profileOverlay?.classList.remove("hidden");
    profileOverlay?.showModal();
    backdrop?.classList.remove("hidden");
  });

  // Close Profile Modal
  closeProfileBtn?.addEventListener("click", () => {
    profileOverlay?.close();
    profileOverlay?.classList.add("hidden");
    backdrop?.classList.add("hidden");
    mainContent?.classList.remove("hidden");
    mainContent?.scrollIntoView({ behavior: "smooth" });
    toggleProductButtons(false);
  });

  // Close Order Modal
  closeOrderModalBtn?.addEventListener("click", () => {
    orderModal?.close();
    backdrop?.classList.add("hidden");
    mainContent?.classList.remove("hidden");
    mainContent?.scrollIntoView({ behavior: "smooth" });
    toggleProductButtons(false);
  });

  // Escape closes any modal and restores mainContent
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll("dialog[open]")?.forEach(modal => {
        modal.close?.();
        modal.classList.add("hidden");
      });
      backdrop?.classList.add("hidden");
      mainContent?.classList.remove("hidden");
      mainContent?.scrollIntoView({ behavior: "smooth" });
      toggleProductButtons(false);
    }
  });
});


