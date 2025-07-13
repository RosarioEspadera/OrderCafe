// 📦 Module Imports
import {
  activateTab,
  toggleProductButtons,
  toggleSignInButtons,
  lockModalButtons,
  showBackdrop,
  hideBackdrop
} from './ui.js';

import { renderCartItems, updateCartCount } from './cart.js';       // 🛒 Cart logic
import { openModal } from './modal.js';                             // 🔓 Safe modal handler

document.addEventListener("DOMContentLoaded", () => {
  // 🌟 DOM References
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
  const userModal = document.getElementById("userModal");
  const closeBtn = document.getElementById("modalCloseBtn");

  const tabs = [homeTab, cartTab, accountTab];

  // 🔄 App Initialization
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

  // 🏠 Home Tab Click
  homeTab?.addEventListener("click", () => {
    activateTab(homeTab, tabs);
    mainContent?.classList.remove("hidden");
    orderModal?.close();
    hideBackdrop();
    toggleProductButtons(false);
    toggleSignInButtons(false);
    lockModalButtons(true);
  });

  // 🛒 Cart Tab Click
  cartTab?.addEventListener("click", () => {
    activateTab(cartTab, tabs);
    renderCartItems();
    updateCartCount();
    openModal("orderModal");
    toggleProductButtons(true);
    toggleSignInButtons(true);
  });

  // 👤 Account Tab Click
  accountTab?.addEventListener("click", () => {
    userModal?.classList.add("fullscreen");

    if (!user || user.userName === "Guest") {
      userName?.value = "";
      userEmail?.value = "";
      userAddress?.value = "";
      currentAvatar.src = fallbackPhoto;
    } else {
    userName?.value = user.userName || "";
    userEmail?.value = user.email || "";
    userAddress?.value = user.address || "";
    currentAvatar.src = user.profilePhoto || fallbackPhoto;

    }

    userModal.showModal?.();
    backdrop?.classList.remove("hidden");
  });

  // ❌ Modal Close Button
  closeBtn?.addEventListener("click", () => {
    userModal?.classList.remove("fullscreen");
    userModal?.close();
    userModal?.classList.add("hidden");
    backdrop?.classList.add("hidden");
  });

  // 🚀 Auto-Launch Home View
  homeTab?.click();
});
