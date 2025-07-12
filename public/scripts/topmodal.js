document.addEventListener("DOMContentLoaded", () => {
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
profileOverlay?.classList.add("hidden");
profileOverlay?.close();
backdrop?.classList.add("hidden");

  
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

  // ✨ Optional: Activate Home Tab on First Load
 homeTab?.click();

});
