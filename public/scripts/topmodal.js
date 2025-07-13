document.addEventListener("DOMContentLoaded", () => {
  // 🎯 Initial UI State
  const modals = document.querySelectorAll("dialog");
  const backdrop = document.querySelector(".modal-backdrop");
  const mainContent = document.getElementById("mainContent");
  const guestBanner = document.getElementById("guestBanner");
  const greetingBanner = document.getElementById("greetingBanner");

  const homeTab = document.getElementById("homeTab");
  const orderTab = document.getElementById("orderTab");
  const accountTab = document.getElementById("accountTab");
  const tabs = [homeTab, orderTab, accountTab];

  const orderModal = document.getElementById("orderModal");

  // 🔁 Global Reset
  function initializeAppState() {
    modals.forEach(modal => {
      modal.close?.();
      modal.classList.add("hidden");
    });

    backdrop?.classList.add("hidden");
    mainContent?.classList.remove("hidden");

    tabs.forEach(tab => tab?.classList.remove("active"));
    homeTab?.classList.add("active");

    guestBanner?.classList.remove("hidden");
    greetingBanner?.classList.add("hidden");

    console.log("✅ App state initialized");
  }

  initializeAppState();

  // 🧩 UI Utilities
  const activateTab = (activeTab) => {
    tabs.forEach(tab => {
      tab?.classList.remove("active");
      tab?.setAttribute("aria-selected", "false");
    });
    activeTab?.classList.add("active");
    activeTab?.setAttribute("aria-selected", "true");
  };

  const toggleProductButtons = (enable) => {
    document.querySelectorAll(".order-button").forEach(btn => {
      btn.disabled = !enable;
      btn.classList.toggle("faded", !enable);
    });
  };

  const toggleSignInButtons = (enable) => {
    document.querySelectorAll(".sign-in-button").forEach(btn => {
      btn.disabled = !enable;
      btn.classList.toggle("faded", !enable);
    });
  };

  const lockModalButtons = (lock) => {
    document.querySelectorAll(".modal-button").forEach(btn => {
      btn.disabled = lock;
    });
  };

  // 🏠 Home Tab
  homeTab?.addEventListener("click", () => {
    activateTab(homeTab);
    mainContent?.classList.remove("hidden");
    orderModal?.close();
    backdrop?.classList.add("hidden");
    toggleProductButtons(false);
    toggleSignInButtons(false);
    lockModalButtons(true);
  });

  // 🛒 Cart Tab
  orderTab?.addEventListener("click", () => {
    activateTab(orderTab);
    mainContent?.classList.add("hidden");
    orderModal?.showModal?.();
    backdrop?.classList.remove("hidden");
    toggleProductButtons(true);
    toggleSignInButtons(true);
    lockModalButtons(false);
  });

  // 🧑 Account Tab (opens userModal elsewhere)
  accountTab?.addEventListener("click", () => {
    activateTab(accountTab);
    mainContent?.classList.remove("hidden");
    // Optional: highlight tab and leave modal logic to account.js
  });

  // ✨ Default to Home Tab
  homeTab?.click();
});
