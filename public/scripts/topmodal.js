document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const orderBtn = document.getElementById("orderBtn");
  const profileBtn = document.getElementById("profileBtn");

  const mainContent = document.getElementById("mainContent");
  const orderModal = document.getElementById("orderModal");
  const profileOverlay = document.getElementById("profileOverlay");

  menuBtn?.addEventListener("click", () => {
    mainContent?.classList.remove("hidden");
    mainContent?.scrollIntoView({ behavior: "smooth" });
  });

  orderBtn?.addEventListener("click", () => {
    orderModal?.showModal();
  });

  profileBtn?.addEventListener("click", () => {
    profileOverlay?.showModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll("dialog[open]")?.forEach(modal => modal.close?.());
    }
  });
});







