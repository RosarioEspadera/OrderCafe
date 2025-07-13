document.addEventListener("DOMContentLoaded", () => {
  // 🌟 Element References
  const modals = document.querySelectorAll("dialog");
  const backdrop = document.querySelector(".modal-backdrop");
  const mainContent = document.getElementById("mainContent");
  const guestBanner = document.getElementById("guestBanner");
  const greetingBanner = document.getElementById("greetingBanner");

  const homeTab = document.getElementById("homeTab");
  const cartTab = document.getElementById("orderTab");
  const accountTab = document.getElementById("accountTab");
  const orderModal = document.getElementById("orderModal");

  const tabs = [homeTab, cartTab, accountTab];

  // 🔁 Initial UI State
  function resetAppState() {
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

  resetAppState();

  // 🎯 Tab Activation Utility
  function activateTab(active) {
    tabs.forEach(tab => {
      tab?.classList.remove("active");
      tab?.setAttribute("aria-selected", "false");
    });
    active?.classList.add("active");
    active?.setAttribute("aria-selected", "true");
  }

  // 🔘 UI Toggle Utilities
  function toggleButtons(selector, enable) {
    document.querySelectorAll(selector).forEach(btn => {
      btn.disabled = !enable;
      btn.classList.toggle("faded", !enable);
    });
  }

  function lockButtons(selector, lock) {
    document.querySelectorAll(selector).forEach(btn => {
      btn.disabled = lock;
    });
  }

  // 🏠 Home Tab
  homeTab?.addEventListener("click", () => {
    activateTab(homeTab);
    mainContent?.classList.remove("hidden");
    orderModal?.close();
    backdrop?.classList.add("hidden");

    toggleButtons(".order-button", false);
    toggleButtons(".sign-in-button", false);
    lockButtons(".modal-button", true);
  });

  // 🛒 Cart Tab
  cartTab?.addEventListener("click", () => {
    activateTab(cartTab);
    mainContent?.classList.add("hidden");
    orderModal?.showModal?.();
    backdrop?.classList.remove("hidden");

    toggleButtons(".order-button", true);
    toggleButtons(".sign-in-button", true);
    lockButtons(".modal-button", false);
  });

  // 🧑 Account Tab
  accountTab?.addEventListener("click", () => {
    activateTab(accountTab);
    mainContent?.classList.remove("hidden");
    // Modal opening handled by account.js
  });

  // 🚀 Kick off with Home Tab
  homeTab?.click();
});
