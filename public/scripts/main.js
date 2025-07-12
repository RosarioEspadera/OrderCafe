window.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("mainContent");
  if (!main) return;

  let cart = JSON.parse(localStorage.getItem("orderCafeCart")) || [];

  function showToast(message = "Added to cart!", duration = 3000) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("fade-out"), duration - 500);
    setTimeout(() => toast.remove(), duration);
  }

  function saveCart() {
    localStorage.setItem("orderCafeCart", JSON.stringify(cart));
  }

  function updateCartCount() {
    const badge = main.querySelector(".cart-count");
    badge.textContent = cart.length;
    badge.classList.toggle("visible", cart.length > 0);
  }

  function addToCart(itemId) {
    if (!cart.includes(itemId)) {
      cart.push(itemId);
      saveCart();
      updateCartCount();
      showToast("✓ Saved to Cart");
    }
  }

  function showOrderSummary() {
    const modal = document.getElementById("orderModal");
    const list = modal.querySelector(".cart-summary");
    list.innerHTML = "";
    cart.forEach(itemId => {
      const card = main.querySelector(`#${itemId}`);
      const title = card?.querySelector(".product-title")?.textContent || "Item";
      const price = card?.querySelector(".price-tag")?.textContent || "₱0";
      const row = document.createElement("li");
      row.textContent = `${title} — ${price}`;
      list.appendChild(row);
    });
    modal.showModal();
  }

  const searchInput = main.querySelector("input[type='search']");
  searchInput?.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    main.querySelectorAll(".product-card").forEach(card => {
      const title = card.querySelector(".product-title")?.textContent.toLowerCase() || "";
      card.style.display = title.includes(keyword) ? "block" : "none";
    });
  });

  main.querySelectorAll(".order-button").forEach(btn => {
    btn.addEventListener("click", () => {
      const productId = btn.closest(".product-card")?.id;
      if (productId) addToCart(productId);
      btn.classList.add("added");
      btn.textContent = "✓ Added!";
      setTimeout(() => {
        btn.classList.remove("added");
        btn.textContent = "Order Now";
      }, 2000);
    });
  });

  document.getElementById("checkoutBtn")?.addEventListener("click", () => {
    showToast("☕ Order placed! Thank you.");
    cart = [];
    saveCart();
    updateCartCount();
    document.getElementById("orderModal")?.close();
  });

  updateCartCount();
});

