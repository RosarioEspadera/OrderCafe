(() => {
  const cart = JSON.parse(localStorage.getItem("orderCafeCart")) || [];

  function renderCartItems() {
    const cartList = document.getElementById("cartList");
    const emptyMsg = document.getElementById("emptyCartMessage");
    let total = 0;

    cartList.innerHTML = "";

    if (cart.length === 0) {
      emptyMsg.classList.remove("hidden");
      document.getElementById("cartTotal").textContent = "$0.00";
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

    document.getElementById("cartTotal").textContent = `$${total.toFixed(2)}`;
  }

  // 🗑️ Handle Item Removal
  document.getElementById("cartList")?.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("orderCafeCart", JSON.stringify(cart));
      renderCartItems();
    }
  });

  // ✅ Close Order Modal
  document.getElementById("closeOrderModal")?.addEventListener("click", () => {
    closeModal("orderModal");
  });

  // 🚀 Place Order
  document.getElementById("placeOrderBtn")?.addEventListener("click", () => {
    if (cart.length === 0) return showToast("Your cart is empty ☕");

    const user = JSON.parse(localStorage.getItem("orderCafeUser"));
    const orderDetails = cart
      .map(item => `${item.name} - $${item.price.toFixed(2)}`)
      .join("\n");
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    emailjs.send("service_epydqmi", "template_vzuexod", {
      user_name: user.username,
      order_details: orderDetails,
      order_total: `$${total.toFixed(2)}`
    })
    .then(() => {
      showToast("Order sent to Rio's Café 📩");
      localStorage.setItem("orderCafeCart", JSON.stringify([]));
      renderCartItems();
      closeModal("orderModal");
    })
    .catch((err) => {
      console.error("EmailJS error:", err);
      showToast("Failed to send receipt ☁️");
    });
  });

  window.addEventListener("DOMContentLoaded", renderCartItems);
})();
