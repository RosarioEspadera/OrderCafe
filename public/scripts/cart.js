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

  // 🧺 Handle empty cart
  if (cart.length === 0) {
    emptyMsg.classList.remove("hidden");
    totalLabel.textContent = "₱0.00";
    return;
  }

  emptyMsg.classList.add("hidden");

  // 🛍️ Render cart items
  cart.forEach(({ name, price, id }) => {
    total += price;

    const li = document.createElement("li");
    li.classList.add("cart-item");

    const nameSpan = document.createElement("span");
    nameSpan.className = "product-title";
    nameSpan.textContent = name;

    const priceSpan = document.createElement("span");
    priceSpan.className = "price-tag";
    priceSpan.textContent = `₱${price.toFixed(2)}`;

    // Optional remove button
    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "✖";
    removeBtn.onclick = () => removeFromCart(id);

    li.append(nameSpan, priceSpan, removeBtn);
    cartList.appendChild(li);
  });

  // 💰 Update total label
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

  
  if (!productCard) {
  showToast("❌ Item not found on the page");
  return;
}

  // Prevent duplicates
  if (!cart.some(item => item.id === itemId)) {
    cart.push({ id: itemId, name, price });
    saveCart();
    updateCartCount();
    showToast("✓ Saved to Cart");
  }
}
export function clearCart() {
  cart = [];
  saveCart();
  updateCartCount();
  renderCartItems();
  showToast("🧺 Cart cleared");
}
