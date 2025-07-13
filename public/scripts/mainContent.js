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

  // ✅ Place Order logic
  document.getElementById("checkoutBtn")?.addEventListener("click", () => {
    showToast("☕ Order placed! Thank you.");
    localStorage.setItem("orderCafeCart", JSON.stringify([]));
    updateCartCount();
    closeModal("orderModal");
    document.getElementById("mainContent")?.classList.remove("hidden");
  });
});
