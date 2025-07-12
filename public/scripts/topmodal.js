document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const orderBtn = document.getElementById("orderBtn");
  const profileBtn = document.getElementById("profileBtn");

  const closeProfileBtn = document.getElementById("closeProfile");
  const closeOrderModalBtn = document.getElementById("closeOrderModal");
  const backToSignInBtn = document.getElementById("backToSignIn");

  const mainContent = document.getElementById("mainContent");
  const orderModal = document.getElementById("orderModal");
  const profileOverlay = document.getElementById("profileOverlay");
  const signInModal = document.getElementById("signInModal");
  const backdrop = document.querySelector(".modal-backdrop");

  const productOrderButtons = document.querySelectorAll(".order-button");
  const signInButtons = signInModal?.querySelectorAll("button:not(#backToSignIn)");

  const toggleProductButtons = (isEnabled) => {
    productOrderButtons?.forEach(btn => {
      btn.disabled = !isEnabled;
    });
  };

  const toggleSignInButtons = (isEnabled) => {
    signInButtons?.forEach(btn => {
      btn.disabled = !isEnabled;
    });
  };

  // Show Menu
  menuBtn?.addEventListener("click", () => {
    mainContent?.classList.remove("hidden");
    mainContent?.scrollIntoView({ behavior: "smooth" });
    toggleProductButtons(false);
    toggleSignInButtons(false);
  });

  // Open Order Modal
  orderBtn?.addEventListener("click", () => {
    toggleProductButtons(true);
    toggleSignInButtons(true);
    orderModal?.showModal();
    backdrop?.classList.remove("hidden");
  });

  // Open Profile Modal
  profileBtn?.addEventListener("click", () => {
    toggleProductButtons(true);
    toggleSignInButtons(true);
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
    toggleSignInButtons(false);
  });

  // Close Order Modal
  closeOrderModalBtn?.addEventListener("click", () => {
    orderModal?.close();
    backdrop?.classList.add("hidden");
    mainContent?.classList.remove("hidden");
    mainContent?.scrollIntoView({ behavior: "smooth" });
    toggleProductButtons(false);
    toggleSignInButtons(false);
  });

  // Escape closes open modals
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
      toggleSignInButtons(false);
    }
  });
});


