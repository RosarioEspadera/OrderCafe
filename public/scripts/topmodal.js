document.addEventListener("DOMContentLoaded", () => {
 const homeTab = document.getElementById("homeTab");
const orderTab = document.getElementById("orderTab");
const profileTab = document.getElementById("profileTab");

const tabs = [homeTab, orderTab, profileTab];
const activateTab = (active) => {
  tabs.forEach(tab => tab.classList.remove("active"));
  active.classList.add("active");
};

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
