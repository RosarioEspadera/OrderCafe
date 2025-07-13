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
export function renderCartItems() {
  const cartList = document.getElementById("cartList");
  const emptyMsg = document.getElementById("emptyCartMessage");
  const totalLabel = document.getElementById("cartTotal");

  if (!cartList || !emptyMsg || !totalLabel) return;

  cartList.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    emptyMsg.classList.remove("hidden");
    totalLabel.textContent = "₱0.00";
    return;
  }

  emptyMsg.classList.add("hidden");

  cart.forEach(item => {
  total += item.price;

  const li = document.createElement("li");
  li.classList.add("cart-item");

  const nameSpan = document.createElement("span");
  nameSpan.className = "product-title";
  nameSpan.textContent = item.name;

  const priceSpan = document.createElement("span");
  priceSpan.className = "price-tag";
  priceSpan.textContent = `₱${item.price.toFixed(2)}`;

  li.append(nameSpan, priceSpan);
  cartList.appendChild(li);
});


  totalLabel.textContent = `₱${total.toFixed(2)}`;
}
export function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  saveCart();
  updateCartCount();
  renderCartItems();
  showToast("🗑️ Removed from Cart");
}
export function addToCart(itemId) {
  const productCard = document.getElementById(itemId);
  const name = productCard?.querySelector(".product-title")?.textContent || "Unnamed Item";
  const priceText = productCard?.querySelector(".price-tag")?.textContent || "₱0";
  const price = parseFloat(priceText.replace(/[^\d.]/g, "")) || 0;

  // Prevent duplicates
  if (!cart.some(item => item.id === itemId)) {
    cart.push({ id: itemId, name, price });
    saveCart();
    updateCartCount();
    showToast("✓ Saved to Cart");
  }
}
