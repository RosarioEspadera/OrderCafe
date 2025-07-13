import { initUserCredentials } from './user.js';
import { initProductEvents } from './products.js';
import { renderCartItems, updateCartCount } from './cart.js';
import { showToast } from './toast.js';
import { openModal, closeModal } from './modal.js';
import { sendReceiptEmail } from './receipt.js'; // ✅ Add if not imported

window.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("mainContent");
  if (!main) return;

  // 🎯 Initialize core modules
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

  // 🛒 CartTab click — open order modal
document.getElementById("cartTab")?.addEventListener("click", () => {
  renderCartItems();            // 💡 Refresh cart before opening
  openModal("orderModal");      // ✅ Then show the modal
  document.getElementById("mainContent")?.classList.add("hidden");
});

  // ❌ Cancel from cart modal
  document.getElementById("closeOrderModal")?.addEventListener("click", () => {
    closeModal("orderModal");
    main.classList.remove("hidden"); // Return to main content
  });

  // ✅ Checkout button logic
  document.getElementById("checkoutBtn")?.addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("orderCafeUser"));
    const userModal = document.getElementById("userModal");

    if (!user || !user.username || !user.email || !user.email.includes("@")) {
      showToast("🚫 Please enter your name and email before checking out.");

      // Trigger credentials modal
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
    main.classList.remove("hidden");
  });
});
