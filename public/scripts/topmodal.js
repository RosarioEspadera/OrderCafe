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
  const backdrop = document.getElementById("backdrop");

  // 🧃 Utility Functions
  const activateTab = (active) => {
    tabs.forEach(tab => {
      tab.classList.remove("active");
      tab.setAttribute("aria-selected", "false");
    });
    active.classList.add("active");
    active.setAttribute("aria-selected", "true");
  };

  const toggleProductButtons = (enable) => {
    const buttons = document.querySelectorAll(".order-button");
    buttons.forEach(btn => {
      btn.disabled = !enable;
      btn.classList.toggle("faded", !enable);
    });
  };

  const toggleSignInButtons = (enable) => {
    const buttons = document.querySelectorAll(".sign-in-button");
    buttons.forEach(btn => {
      btn.disabled = !enable;
      btn.classList.toggle("faded", !enable);
    });
  };

  const lockModalButtons = (lock) => {
    const buttons = document.querySelectorAll(".modal-button");
    buttons.forEach(btn => btn.disabled = lock);
  };

  // 📌 Tab Handlers
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

  orderTab?.addEventListener("click", () => {
    activateTab(orderTab);
    mainContent.classList.add("hidden");
    orderModal?.showModal();
    backdrop?.classList.remove("hidden");
    toggleProductButtons(true);
    toggleSignInButtons(true);
    lockModalButtons(false);
  });

  profileTab?.addEventListener("click", () => {
    activateTab(profileTab);
    mainContent.classList.add("hidden");
    profileOverlay?.classList.remove("hidden");
    profileOverlay?.showModal();
    backdrop?.classList.remove("hidden");
    toggleProductButtons(true);
    toggleSignInButtons(true);
    lockModalButtons(false);
  });

  closeProfileButton?.addEventListener("click", () => {
  profileOverlay?.close();
  profileOverlay?.classList.add("hidden");
  backdrop?.classList.add("hidden");
  mainContent.classList.remove("hidden"); // 👈 Add this!
  toggleProductButtons(false);
  toggleSignInButtons(false);
  lockModalButtons(true);
});
});
