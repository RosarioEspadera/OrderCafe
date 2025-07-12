(() => {
  // 🛒 Load cart from storage
  let cart = JSON.parse(localStorage.getItem("orderCafeCart")) || [];

  // 🔁 Save cart to localStorage
  function saveCart() {
    localStorage.setItem("orderCafeCart", JSON.stringify(cart));
  }

  // 🧾 Render items inside order modal
  function renderCartItems() {
    const cartList = document.getElementById("cartList");
    const emptyMsg = document.getElementById("emptyCartMessage");
    const totalLabel = document.getElementById("cartTotal");

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
      total += item.price;
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="item-name">${item.name}</span>
        <span class="item-price">$${item.price.toFixed(2)}</span>
        <button class="remove-item" data-index="${index}">✕</button>
      `;
      cartList.appendChild(li);
    });

    totalLabel.textContent = `$${total.toFixed(2)}`;
  }

  // 🧹 Remove item from cart
  document.getElementById("cartList")?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("remove-item")) {
      const index = parseInt(target.dataset.index);
      cart.splice(index, 1);
      saveCart();
      renderCartItems();
    }
  });

  // ❌ Close order modal
  document.getElementById("closeOrderModal")?.addEventListener("click", () => {
    closeModal("orderModal");
  });

  // ✅ Order submission via EmailJS
  document.getElementById("placeOrderBtn")?.addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Your cart is empty ☕");
      return;
    }

    const user = JSON.parse(localStorage.getItem("orderCafeUser"));
    if (!user?.username || user.username === "Guest") {
      showToast("Please sign in to place your order 🍃");
      return;
    }

    const orderDetails = cart
      .map(item => `${item.name} — $${item.price.toFixed(2)}`)
      .join("\n");

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    emailjs.send("service_epydqmi", "template_vzuexod", {
      user_name: user.username,
      order_details: orderDetails,
      order_total: `$${total.toFixed(2)}`
    })
    .then(() => {
      showToast("Order sent to Rio's Café 📩");
      cart = [];
      saveCart();
      renderCartItems();
      closeModal("orderModal");
    })
    .catch((err) => {
      console.error("EmailJS error:", err);
      showToast("Failed to send receipt ☁️");
    });
  });

  // 🚀 Initialize on load
  window.addEventListener("DOMContentLoaded", renderCartItems);
})();

