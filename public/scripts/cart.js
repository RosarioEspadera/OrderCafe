import { showToast } from './toast.js';

// 🛒 Load cart from storage or initialize empty
export let cart = JSON.parse(localStorage.getItem("orderCafeCart")) || [];

// 💾 Save cart to localStorage
export function saveCart() {
  localStorage.setItem("orderCafeCart", JSON.stringify(cart));
}

// 🔢 Update cart count indicators
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

// 🛍️ Render cart items to UI
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
    return;
  }

  emptyMessage.classList.add("hidden");

  cart.forEach(({ name, price, id }) => {
    total += price;

    const itemElement = document.createElement("li");
    itemElement.classList.add("cart-item");

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
}

// ➖ Remove item from cart
export function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  saveCart();
  updateCartCount();
  renderCartItems();
  showToast("🗑️ Removed from Cart");
}

// ➕ Add product to cart using DOM data
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

// 🧺 Clear entire cart
export function clearCart() {
  cart = [];
  saveCart();
  updateCartCount();
  renderCartItems();
  showToast("🧺 Cart cleared");
}
