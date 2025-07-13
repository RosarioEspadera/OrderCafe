import { initUserCredentials } from './user.js';
import { initProductEvents } from './products.js';
import { renderCartItems, updateCartCount } from './cart.js';
import { showToast } from './toast.js';
import { closeModal } from './modal.js';

window.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("mainContent");
  if (!main) return;

  // 🎯 Initialize modules
  initUserCredentials();
  initProductEvents();
  renderCartItems();
  updateCartCount();

  // 🔍 Product Search Filter
  const searchInput = main.querySelector("input[type='search']");
  searchInput?.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    main.querySelectorAll(".product-card").forEach(card => {
      const title = card.querySelector(".product-title")?.textContent.toLowerCase() || "";
      card.style.display = title.includes(keyword) ? "block" : "none";
    });
  });

  // ❌ Close Order Modal (Cancel button)
  document.getElementById("closeOrderModal")?.addEventListener("click", () => {
    closeModal("orderModal");
    document.getElementById("mainContent")?.classList.remove("hidden");
  });

document.getElementById("checkoutBtn")?.addEventListener("click", () => {
  const user = JSON.parse(localStorage.getItem("orderCafeUser"));
  const userModal = document.getElementById("userModal");

  if (!user || !user.username || !user.email || !user.email.includes("@")) {
    showToast("🚫 Please enter your name and email before checking out.");
    
    // Trigger the credentials modal
    if (userModal?.showModal) {
      userModal.showModal();
    } else {
      userModal?.classList.add("visible");
    }

    return;
  }

  showToast("☕ Order placed! Thank you.");
  localStorage.setItem("orderCafeCart", JSON.stringify([]));
  updateCartCount();
  sendReceiptEmail();
  closeModal("orderModal");
  document.getElementById("mainContent")?.classList.remove("hidden");
});


});
