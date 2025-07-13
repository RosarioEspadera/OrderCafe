import {
  activateTab,
  toggleProductButtons,
  toggleSignInButtons,
  lockModalButtons,
  showBackdrop,
  hideBackdrop
} from './ui.js';

import { renderCartItems, updateCartCount } from './cart.js';       // ✅ Cart logic
import { openModal } from './modal.js';                             // ✅ Safe modal handler

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
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = document.getElementById("userNameInput");
  const userEmail = document.getElementById("email");
  const userAddress = document.getElementById("address");
  const currentAvatar = document.getElementById("currentAvatar");

  const tabs = [homeTab, cartTab, accountTab];

  // 🔄 Initial UI State Setup
  function initializeAppState() {
    modals.forEach(modal => {
      modal.close?.();
      modal.classList.add("hidden");
    });

    hideBackdrop();
    mainContent?.classList.remove("hidden");

    tabs.forEach(tab => tab?.classList.remove("active"));
    activateTab(homeTab, tabs);

    guestBanner?.classList.remove("hidden");
    greetingBanner?.classList.add("hidden");

    console.log("✅ App state initialized");
  }

  initializeAppState();

  // 🏠 Home Tab Handler
  homeTab?.addEventListener("click", () => {
    activateTab(homeTab, tabs);
    mainContent?.classList.remove("hidden");
    orderModal?.close();
    hideBackdrop();
    toggleProductButtons(false);
    toggleSignInButtons(false);
    lockModalButtons(true);
  });


 // 🛒 Cart Tab Handler
cartTab?.addEventListener("click", () => {
  activateTab(cartTab, tabs);
  renderCartItems();                  // Refresh cart contents
  updateCartCount();                 // Sync visual badge
  openModal("orderModal");           // 💥 Fixed modal handler
  toggleProductButtons(true);
  toggleSignInButtons(true);
});

  // 🧑 Account Tab Handler
 accountTab?.addEventListener("click", () => {
  userModal?.classList.add("fullscreen");

  if (!user || user.username === "Guest") {
    userName?.value = "";
    userEmail?.value = "";
    userAddress?.value = "";
    currentAvatar.src = fallbackPhoto;
  } else {
    userName?.value = user.username || "";
    userEmail?.value = user.email || "";
    userAddress?.value = user.address || "";
    currentAvatar.src = user.profilePhoto || fallbackPhoto;
  }

  userModal.showModal?.();
  backdrop?.classList.remove("hidden");
});
closeBtn?.addEventListener("click", () => {
  userModal?.classList.remove("fullscreen");
  userModal?.close();
  userModal?.classList.add("hidden");
  backdrop?.classList.add("hidden");
});


  // 🚀 Launch with Home Tab Active
  homeTab?.click();
});
