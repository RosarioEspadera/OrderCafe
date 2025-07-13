import { showToast } from './toast.js';
document.addEventListener("DOMContentLoaded", () => {
  // 🛒 Load cart from local storage or initialize
  let cart = JSON.parse(localStorage.getItem("orderCafeCart")) || [];

  const cartList = document.getElementById("cartList");
  const emptyMsg = document.getElementById("emptyCartMessage");
  const totalLabel = document.getElementById("cartTotal");
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  const closeOrderModalBtn = document.getElementById("closeOrderModal");

  // 💾 Save cart to localStorage
  const saveCart = () => {
    localStorage.setItem("orderCafeCart", JSON.stringify(cart));
  };

  // 🧾 Render items inside the cart
  const renderCartItems = () => {
    if (!cartList || !emptyMsg || !totalLabel) return;

    cartList.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      emptyMsg.classList.remove("hidden");
      totalLabel.textContent = "$0.00";
      return;
    }

    emptyMsg.classList.add("hidden");

    cart.forEach((item, index) => {
      const itemPrice = typeof item.price === "number" ? item.price : 0;
      total += itemPrice;

      const li = document.createElement("li");
      li.innerHTML = `
        <span class="product-title">${item.name}</span>
        <span class="price-tag">$${itemPrice.toFixed(2)}</span>
        <button class="remove-item" data-index="${index}">✕</button>
      `;
      cartList.appendChild(li);
    });

    totalLabel.textContent = `$${total.toFixed(2)}`;
  };

  // 🧹 Remove item when ✕ is clicked
  cartList?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("remove-item")) {
      const index = parseInt(target.dataset.index);
      cart.splice(index, 1);
      showToast(`Removed ${item.name} from cart 🧹`);
      saveCart();
      renderCartItems();
    }
  });

  // ❌ Close the order modal
  closeOrderModalBtn?.addEventListener("click", () => {
    document.getElementById("orderModal")?.close();
    document.querySelector(".modal-backdrop")?.classList.add("hidden");
    document.getElementById("mainContent")?.classList.remove("hidden");
    document.getElementById("mainContent")?.scrollIntoView({ behavior: "smooth" });
  });

  // ✅ Place order (add your EmailJS or API logic here)
  placeOrderBtn?.addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Your cart is empty ☕");
      return;
    }

    // You can insert your order submission logic here
    showToast("Your order was placed successfully 🎉");

    cart = [];
    saveCart();
    renderCartItems();
    document.getElementById("orderModal")?.close();
    document.querySelector(".modal-backdrop")?.classList.add("hidden");
  });

  // 🧊 Initial render
  renderCartItems();
});
