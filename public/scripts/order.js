import { showToast } from './toast.js';

document.addEventListener("DOMContentLoaded", () => {
  // 🧊 Load user modal
  const userModal = document.getElementById("userModal");
  const userForm = document.getElementById("userForm");
  const userFeedback = document.getElementById("userFeedback");

  const storedUser = JSON.parse(localStorage.getItem("orderCafeUser"));
  if (!storedUser) {
    userModal?.showModal();
  }

  userForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!username || !email.includes("@")) {
      showToast("Please enter a valid name and email 📭");
      return;
    }

    localStorage.setItem("orderCafeUser", JSON.stringify({ username, email }));
    userFeedback?.classList.remove("hidden");
    showToast("User credentials saved 📝");
    setTimeout(() => userModal?.close(), 1500);
  });

  // 🛒 Initialize cart
  let cart = JSON.parse(localStorage.getItem("orderCafeCart")) || [];

  // 🧩 Grab DOM elements
  const cartList = document.getElementById("cartList");
  const emptyMsg = document.getElementById("emptyCartMessage");
  const totalLabel = document.getElementById("cartTotal");
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  const closeOrderModalBtn = document.getElementById("closeOrderModal");

  const saveCart = () => {
    localStorage.setItem("orderCafeCart", JSON.stringify(cart));
  };

  const renderCartItems = () => {
    if (!cartList || !emptyMsg || !totalLabel) return;

    cartList.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      emptyMsg.classList.remove("hidden");
      totalLabel.textContent = "$0.00";
      return;
    }

    const user = JSON.parse(localStorage.getItem("orderCafeUser"));
    if (!user || !user.email.includes("@")) {
      showToast("Missing or invalid credentials ⚠️");
      return;
    }

    emptyMsg.classList.add("hidden");

    cart.forEach((item, index) => {
      const itemPrice = typeof item.price === "number" ? item.price : 0;
      total += itemPrice;

      const li = document.createElement("li");
      li.classList.add("cart-item");

      const titleSpan = document.createElement("span");
      titleSpan.className = "product-title";
      titleSpan.textContent = item.name;

      const priceSpan = document.createElement("span");
      priceSpan.className = "price-tag";
      priceSpan.textContent = `$${itemPrice.toFixed(2)}`;

      const removeBtn = document.createElement("button");
      removeBtn.className = "remove-item";
      removeBtn.dataset.index = index;
      removeBtn.setAttribute("aria-label", `Remove ${item.name} from cart`);
      removeBtn.textContent = "✕";

      li.append(titleSpan, priceSpan, removeBtn);
      cartList.appendChild(li);
    });

    totalLabel.textContent = `$${total.toFixed(2)}`;
  };

  cartList?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("remove-item")) {
      const index = parseInt(target.dataset.index);
      const removedItem = cart[index];
      cart.splice(index, 1);
      showToast(`Removed ${removedItem.name} from cart 🧹`);
      saveCart();
      renderCartItems();
    }
  });

  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach(card => {
    const orderButton = card.querySelector(".order-button");
    const name = card.querySelector(".product-title")?.textContent?.trim();
    const priceText = card.querySelector(".price-tag")?.textContent?.trim();
    const price = parseFloat(priceText?.replace("$", ""));

    orderButton?.addEventListener("click", () => {
      cart.push({ name, price });
      saveCart();
      renderCartItems();
      showToast(`🛒 ${name} added to your cart`);
    });
  });

  closeOrderModalBtn?.addEventListener("click", () => {
    document.getElementById("orderModal")?.close();
    document.querySelector(".modal-backdrop")?.classList.add("hidden");
    document.getElementById("mainContent")?.classList.remove("hidden");
    document.getElementById("mainContent")?.scrollIntoView({ behavior: "smooth" });
  });

  placeOrderBtn?.addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Your cart is empty ☕");
      return;
    }

    showToast("Your order was placed successfully 🎉");

    cart = [];
    saveCart();
    renderCartItems();
    document.getElementById("orderModal")?.close();
    document.querySelector(".modal-backdrop")?.classList.add("hidden");
  });

  renderCartItems();
});
