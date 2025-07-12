(() => {
  // 🛒 Load Cart from localStorage
  let cart = JSON.parse(localStorage.getItem("orderCafeCart")) || [];

  // ✅ Render Cart Items in the Modal
  function renderCartItems() {
    const cartList = document.getElementById("cartList");
    const emptyMsg = document.getElementById("emptyCartMessage");
    const totalLabel = document.getElementById("cartTotal");

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

  // 🧹 Remove Item from Cart
  document.getElementById("cartList")?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("remove-item")) {
      const index = parseInt(target.dataset.index);
      cart.splice(index, 1);
      localStorage.setItem("orderCafeCart", JSON.stringify(cart));
      renderCartItems();
    }
  });

  // ❌ Close Cart Modal
  document.getElementById("closeOrderModal")?.addEventListener("click", () => {
    closeModal("orderModal");
  });

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add("hidden");
    modal.close(); // ← important for dialog element
  }
}


  // 🚚 Place Order via EmailJS
  document.getElementById("placeOrderBtn")?.addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Your cart is empty ☕");
      return;
    }

    const user = JSON.parse(localStorage.getItem("orderCafeUser"));
    if (!user?.username) {
      showToast("No user found ❌");
      return;
    }

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
      cart = [];
      localStorage.setItem("orderCafeCart", JSON.stringify([]));
      renderCartItems();
      closeModal("orderModal");
    })
    .catch((err) => {
      console.error("EmailJS error:", err);
      showToast("Failed to send receipt ☁️");
    });
  });

  // 🚀 Initialize Cart on Page Load
  window.addEventListener("DOMContentLoaded", renderCartItems);
})();
