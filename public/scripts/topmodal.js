document.addEventListener("DOMContentLoaded", () => {

  // ✅ Global State Initialization Function
  function initializeAppState() {
    const modals = document.querySelectorAll("dialog");
    const backdrop = document.querySelector(".modal-backdrop");
    const tabs = ["homeTab", "orderTab", "profileTab"];
    const banners = ["guestBanner", "greetingBanner"];
    const mainContent = document.getElementById("mainContent");
    const profileOverlay = document.getElementById("profileOverlay");

    modals.forEach(modal => {
      modal.close?.();
      modal.classList.add("hidden");
    });

    profileOverlay?.close();
    profileOverlay?.classList.add("hidden");
    backdrop?.classList.add("hidden");

    tabs.forEach(id => {
      document.getElementById(id)?.classList.remove("active");
    });
    document.getElementById("homeTab")?.classList.add("active");

    banners.forEach(id => {
      document.getElementById(id)?.classList.add("hidden");
    });
    document.getElementById("guestBanner")?.classList.remove("hidden");

    mainContent?.classList.remove("hidden");

    console.log("✅ App state initialized");
  }

  // 🔄 Reset app state before anything else
  initializeAppState();

  // 🌟 Element References
  const homeTab = document.getElementById("homeTab");
  const orderTab = document.getElementById("orderTab");
  const profileTab = document.getElementById("profileTab");
  const tabs = [homeTab, orderTab, profileTab];

  const mainContent = document.getElementById("mainContent");
  const orderModal = document.getElementById("orderModal");
  const profileOverlay = document.getElementById("profileOverlay");
  const closeProfileButton = document.getElementById("closeProfile");
  const backdrop = document.querySelector(".modal-backdrop");

  // 🧩 Utility Functions
  const activateTab = (activeTab) => {
    tabs.forEach(tab => {
      tab?.classList.remove("active");
      tab?.setAttribute("aria-selected", "false");
    });
    activeTab?.classList.add("active");
    activeTab?.setAttribute("aria-selected", "true");
  };

  const toggleProductButtons = (enable) => {
    document.querySelectorAll(".order-button").forEach(button => {
      button.disabled = !enable;
      button.classList.toggle("faded", !enable);
    });
  };

  const toggleSignInButtons = (enable) => {
    document.querySelectorAll(".sign-in-button").forEach(button => {
      button.disabled = !enable;
      button.classList.toggle("faded", !enable);
    });
  };

  const lockModalButtons = (lock) => {
    document.querySelectorAll(".modal-button").forEach(button => {
      button.disabled = lock;
    });
  };

  // 🏠 Home Tab
  homeTab?.addEventListener("click", () => {
    activateTab(homeTab);
    mainContent.classList.remove("hidden");
    orderModal?.close();
    profileOverlay?.close();
    profileOverlay?.classList.add("hidden");
    backdrop?.classList.add("hidden");
    toggleProductButtons(false);
    toggleSignInButtons(false);
    lockModalButtons(true);
  });

  // 🛒 Order Tab
  orderTab?.addEventListener("click", () => {
    activateTab(orderTab);
    mainContent.classList.add("hidden");
    orderModal?.showModal();
    backdrop?.classList.remove("hidden");
    toggleProductButtons(true);
    toggleSignInButtons(true);
    lockModalButtons(false);
  });

  // 👤 Profile Tab
  profileTab?.addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("orderCafeUser"));

    if (user && typeof user.username === "string" && user.username.trim() !== "" && user.username !== "Guest") {
      activateTab(profileTab);
      mainContent.classList.add("hidden");
      profileOverlay?.classList.remove("hidden");
      profileOverlay?.showModal();
      backdrop?.classList.remove("hidden");
      toggleProductButtons(true);
      toggleSignInButtons(true);
      lockModalButtons(false);
    } else {
      showToast("Please sign in to access your profile ☕");
      openModal("signInModal");
    }
  });

  // ❌ Close Profile Modal
  closeProfileButton?.addEventListener("click", () => {
    profileOverlay?.close();
    profileOverlay?.classList.add("hidden");
    backdrop?.classList.add("hidden");
    mainContent.classList.remove("hidden");
    activateTab(homeTab);
    toggleProductButtons(false);
    toggleSignInButtons(false);
    lockModalButtons(true);
  });

  // ✨ Activate Home Tab on First Load
  homeTab?.click();
});
