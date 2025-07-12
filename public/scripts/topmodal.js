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
  profileOverlay.classList.remove("hidden");         // ensure visibility
  profileOverlay.showModal();                        // native dialog open
  document.querySelector(".modal-backdrop")?.classList.remove("hidden"); // blur overlay
});


  document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll("dialog[open]")?.forEach(modal => {
      modal.close?.();
      modal.classList.add("hidden");
    });
    document.querySelector(".modal-backdrop")?.classList.add("hidden");
  }
});
});







