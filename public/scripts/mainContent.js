import { initUserCredentials } from './user.js';
import { initProductEvents } from './products.js';
import { renderCartItems, updateCartCount } from './cart.js';
import { showToast } from './toast.js';
import { openModal, closeModal } from './modal.js';
import { sendReceiptEmail } from './receipt.js';

window.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("mainContent");
  if (!main) return;

  // 🚀 Initialize key modules
  initUserCredentials();
  initProductEvents();
  renderCartItems();
  updateCartCount();

  // 🔍 Product search filter
  const searchInput = main.querySelector("input[type='search']");
  searchInput?.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    main.querySelectorAll(".product-card").forEach(card => {
      const title = card.querySelector(".product-title")?.textContent.toLowerCase() || "";
      card.style.display = title.includes(keyword) ? "block" : "none";
    });
  });

  // 🛒 Cart tab click — open cart modal
 document.getElementById("cartTab")?.addEventListener("click", () => {
  renderCartItems();                      // Refresh cart contents
  updateCartCount();                      // Sync badge & count
  openModal("orderModal");                // Open via fixed modal util
});


  // ❌ Cancel button in cart modal
  document.getElementById("closeOrderModal")?.addEventListener("click", () => {
    closeModal("orderModal");                // Hide modal properly
    main.classList.remove("hidden");         // Reveal main content again
  });

  // ✅ Checkout button click handler
  document.getElementById("checkoutBtn")?.addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("orderCafeUser"));
    const userModal = document.getElementById("userModal");

    // 🧠 Validate user credentials
    if (!user || !user.username || !user.email || !user.email.includes("@")) {
      showToast("🚫 Please enter your name and email before checking out.");
      
      // Prompt user to fill credentials
      if (userModal?.showModal) {
        userModal.showModal();
      } else {
        userModal?.classList.add("visible");
      }
      return;
    }

    // ☕ Confirm order
    showToast("☕ Order placed! Thank you.");
    updateCartCount();
    sendReceiptEmail();                      // Email receipt and clear cart after sending
    closeModal("orderModal");                // Close modal and restore main content
    main.classList.remove("hidden");
  });
});
