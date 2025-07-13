// ui.js

export function activateTab(activeTab, tabs = []) {
  tabs.forEach(tab => {
    tab?.classList.remove("active");
    tab?.setAttribute("aria-selected", "false");
  });
  activeTab?.classList.add("active");
  activeTab?.setAttribute("aria-selected", "true");
}

export function toggleProductButtons(enable) {
  document.querySelectorAll(".order-button").forEach(btn => {
    btn.disabled = !enable;
    btn.classList.toggle("faded", !enable);
  });
}

export function toggleSignInButtons(enable) {
  document.querySelectorAll(".sign-in-button").forEach(btn => {
    btn.disabled = !enable;
    btn.classList.toggle("faded", !enable);
  });
}

export function lockModalButtons(lock) {
  document.querySelectorAll(".modal-button").forEach(btn => {
    btn.disabled = lock;
  });
}

export function hideBackdrop() {
  document.querySelector(".modal-backdrop")?.classList.add("hidden");
}

export function showBackdrop() {
  document.querySelector(".modal-backdrop")?.classList.remove("hidden");
}
