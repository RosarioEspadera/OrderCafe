import { showToast } from './toast.js';
import { lockModalButtons } from './ui.js';

// 🛒 Load cart from storage or initialize
export let cart = JSON.parse(localStorage.getItem("orderCafeCart")) || [];

// 💾 Save cart to localStorage
export function saveCart() {
  localStorage.setItem("orderCafeCart", JSON.stringify(cart));
}

// 🔢 Update visual cart counts
export function updateCartCount() {
  const main = document.getElementById("mainContent");
  const badge = main?.querySelector(".cart-count");
  if (badge) {
    badge.textContent = cart.length;
    badge.classList.toggle("visible", cart.length > 0);
  }

  const cartCount = document.getElementById("cartCount");
  if (cartCount) cartCount.textContent = cart.length;
}

// 🧾 Render cart items into modal
export function renderCartItems() {
  const cartList = document.getElementById("cartList");
  const emptyMessage = document.getElementById("emptyCartMessage");
  const totalDisplay = document.getElementById("cartTotal");

  if (!cartList || !emptyMessage || !totalDisplay) return;

  cartList.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    emptyMessage.classList.remove("hidden");
    totalDisplay.textContent = "₱0.00";
    lockModalButtons(false); // ✅ Even if empty, buttons stay responsive
    return;
  }

  emptyMessage.classList.add("hidden");

  cart.forEach(({ name, price, id }) => {
    total += price;

    const itemElement = document.createElement("li");
    itemElement.className = "cart-item";

    const nameSpan = document.createElement("span");
    nameSpan.className = "product-title";
    nameSpan.textContent = name;

    const priceSpan = document.createElement("span");
    priceSpan.className = "price-tag";
    priceSpan.textContent = `₱${price.toFixed(2)}`;

    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "✖";
    removeBtn.onclick = () => removeFromCart(id);

    itemElement.append(nameSpan, priceSpan, removeBtn);
    cartList.appendChild(itemElement);
  });

  totalDisplay.textContent = `₱${total.toFixed(2)}`;
  lockModalButtons(false); // ✅ Unlock buttons after render
}

// ➖ Remove item from cart
export function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  saveCart();
  updateCartCount();
  renderCartItems();
  showToast("🗑️ Removed from Cart");
}

// ➕ Add product to cart using DOM reference
export function addToCart(itemId) {
  const productCard = document.getElementById(itemId);
  if (!productCard) {
    showToast(`❌ Item not found: ${itemId}`);
    return;
  }

  const name = productCard.querySelector(".product-title")?.textContent || "Unnamed Item";
  const priceText = productCard.querySelector(".price-tag")?.textContent || "₱0";
  const price = parseFloat(priceText.replace(/[^\d.]/g, "")) || 0;

  if (!cart.some(item => item.id === itemId)) {
    cart.push({ id: itemId, name, price });
    saveCart();
    updateCartCount();
    showToast(`✓ Added ${name} to Cart`);
  }
}

// 🧹 Clear entire cart
export function clearCart() {
  cart = [];
  saveCart();
  updateCartCount();
  renderCartItems();
  showToast("🧼 Cart cleared");
}
