import { showToast } from './toast.js';

export let cart = JSON.parse(localStorage.getItem("orderCafeCart")) || [];

export function saveCart() {
  localStorage.setItem("orderCafeCart", JSON.stringify(cart));
}

export function updateCartCount() {
  const main = document.getElementById("mainContent");
  const badge = main?.querySelector(".cart-count");
  if (badge) {
    badge.textContent = cart.length;
    badge.classList.toggle("visible", cart.length > 0);
  }
  const cartCountElement = document.getElementById("cartCount");
  if (cartCountElement) cartCountElement.textContent = cart.length;
}

export function addToCart(itemId) {
  if (!cart.includes(itemId)) {
    cart.push(itemId);
    saveCart();
    updateCartCount();
    showToast("✓ Saved to Cart");
  }
}
