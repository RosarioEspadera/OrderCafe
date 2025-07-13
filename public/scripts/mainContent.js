import { initUserCredentials } from './user.js';
import { initProductEvents } from './products.js';
import { renderCartItems, updateCartCount } from './cart.js';
import { showToast } from './toast.js';

window.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("mainContent");
  if (!main) return;

  // 🛒 Cart state
  let cart = JSON.parse(localStorage.getItem("orderCafeCart")) || [];

  // 🍩 Utility: Toast Notification
  function showToast(message = "Added to cart!", duration = 3000) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("fade-out"), duration - 500);
    setTimeout(() => toast.remove(), duration);
  }

  // 💾 Save Cart to Storage
  function saveCart() {
    localStorage.setItem("orderCafeCart", JSON.stringify(cart));
  }

  // 🔢 Update Cart Count Badge
  function updateCartCount() {
    const badge = main.querySelector(".cart-count");
    if (badge) {
      badge.textContent = cart.length;
      badge.classList.toggle("visible", cart.length > 0);
    }

    const cartCountElement = document.getElementById("cartCount");
    if (cartCountElement) {
      cartCountElement.textContent = cart.length;
    }
  }

  // ➕ Add Item to Cart
  function addToCart(itemId) {
    if (!cart.includes(itemId)) {
      cart.push(itemId);
      saveCart();
      updateCartCount();
      showToast("✓ Saved to Cart");
    }
  }

  // 🧾 Show Order Summary Modal
  function showOrderSummary() {
    const modal = document.getElementById("orderModal");
    const list = modal?.querySelector(".cart-summary");
    if (!list) return;

    list.innerHTML = "";
    cart.forEach(itemId => {
      const card = main.querySelector(`#${itemId}`);
      const title = card?.querySelector(".product-title")?.textContent || "Item";
      const price = card?.querySelector(".price-tag")?.textContent || "₱0";
      const row = document.createElement("li");
      row.textContent = `${title} — ${price}`;
      list.appendChild(row);
    });

    modal?.showModal();
  }

  // 🔍 Product Search Filter
  const searchInput = main.querySelector("input[type='search']");
  searchInput?.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    main.querySelectorAll(".product-card").forEach(card => {
      const title = card.querySelector(".product-title")?.textContent.toLowerCase() || "";
      card.style.display = title.includes(keyword) ? "block" : "none";
    });
  });

  // 🧁 Handle "Order Now" Button Clicks
  main.querySelectorAll(".order-button").forEach(btn => {
    btn.addEventListener("click", () => {
      const productId = btn.closest(".product-card")?.id;
      if (productId) addToCart(productId);

      btn.classList.add("added");
      btn.textContent = "✓ Added!";
      setTimeout(() => {
        btn.classList.remove("added");
        btn.textContent = "Order Now";
      }, 2000);
    });
  });

  // ✅ Checkout Button Logic
  document.getElementById("checkoutBtn")?.addEventListener("click", () => {
    showToast("☕ Order placed! Thank you.");
    cart = [];
    saveCart();
    updateCartCount();
    document.getElementById("orderModal")?.close();
  });

  // 🔁 Initial Cart Badge Update
  updateCartCount();
});
