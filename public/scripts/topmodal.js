document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const orderBtn = document.getElementById("orderBtn");
  const profileBtn = document.getElementById("profileBtn");

  const closeProfileBtn = document.getElementById("closeProfile");
  const closeOrderModalBtn = document.getElementById("closeOrderModal");
  const backToSignInBtn = document.getElementById("backToSignIn");
  const switchAccountBtn = document.getElementById("switchAccountBtn");

  const mainContent = document.getElementById("mainContent");
  const orderModal = document.getElementById("orderModal");
  const profileOverlay = document.getElementById("profileOverlay");
  const signInModal = document.getElementById("signInModal");
  const backdrop = document.querySelector(".modal-backdrop");

  const productOrderButtons = document.querySelectorAll(".order-button");
  const signInButtons = signInModal?.querySelectorAll("button:not(#backToSignIn)");

  // Helpers to toggle state
  const toggleProductButtons = (isEnabled) => {
    productOrderButtons?.forEach(btn => { btn.disabled = !isEnabled; });
  };

  const toggleSignInButtons = (isEnabled) => {
    signInButtons?.forEach(btn => { btn.disabled = !isEnabled; });
  };

  const toggleSwitchAccount = (isEnabled) => {
    switchAccountBtn.disabled = !isEnabled;
  };

  // Show Main Content and lock interaction
  menuBtn?.addEventListener("click", () => {
    mainContent?.classList.remove("hidden");
    mainContent?.scrollIntoView({ behavior: "smooth" });
    toggleProductButtons(false);
    toggleSignInButtons(false);
    toggleSwitchAccount(false); // disable Switch Account in menu
  });

  // Open Order Modal
  orderBtn?.addEventListener("click", () => {
    toggleProductButtons(true);
    toggleSignInButtons(true);
    toggleSwitchAccount(true);
    orderModal?.showModal();
    backdrop?.classList.remove("hidden");
  });

  // Open Profile Modal
  profileBtn?.addEventListener("click", () => {
    toggleProductButtons(true);
    toggleSignInButtons(true);
    toggleSwitchAccount(true);
    profileOverlay?.classList.remove("hidden");
    profileOverlay?.showModal();
    backdrop?.classList.remove("hidden");
  });

  // Switch Account — Only allowed when not in mainContent
  switchAccountBtn?.addEventListener("click", () => {
    const isInMain = !mainContent.classList.contains("hidden");
    if (!isInMain) {
      signInModal?.classList.remove("hidden");
      signInModal?.showModal();
      backdrop?.classList.remove("hidden");
    } else {
      console.warn("Switching accounts is disabled during menu view.");
    }
  });

  // Close Profile
  closeProfileBtn?.addEventListener("click", () => {
    profileOverlay?.close();
    profileOverlay?.classList.add("hidden");
    backdrop?.classList.add("hidden");
    mainContent?.classList.remove("hidden");
    mainContent?.scrollIntoView({ behavior: "smooth" });
    toggleProductButtons(false);
    toggleSignInButtons(false);
    toggleSwitchAccount(false);
  });

  // Close Order
  closeOrderModalBtn?.addEventListener("click", () => {
    orderModal?.close();
    backdrop?.classList.add("hidden");
    mainContent?.classList.remove("hidden");
    mainContent?.scrollIntoView({ behavior: "smooth" });
    toggleProductButtons(false);
    toggleSignInButtons(false);
    toggleSwitchAccount(false);
  });

  // Escape Key — Close all modals and return to mainContent
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
      toggleSwitchAccount(false);
    }
  });
});
