window.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("mainContent");
  if (!main) return;

  // 🛒 Initialize Cart
  let cart = JSON.parse(localStorage.getItem("orderCafeCart")) || [];

  // 🔔 Toast Notification
  function showToast(message = "Added to cart!", duration = 3000) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("fade-out"), duration - 500);
    setTimeout(() => toast.remove(), duration);
  }

  // 🧾 Cart Save & Update
  function saveCart() {
    localStorage.setItem("orderCafeCart", JSON.stringify(cart));
  }

  function updateCartCount() {
    const badge = main.querySelector(".cart-count");
    if (badge) {
      badge.textContent = cart.length;
      badge.classList.toggle("visible", cart.length > 0);
    }
  }

  function addToCart(itemId) {
    if (!cart.includes(itemId)) {
      cart.push(itemId);
      saveCart();
      updateCartCount();
      showToast("✓ Saved to Cart");
    }
  }

  // 🛍️ Show Cart Summary
  function showOrderSummary() {
    const modal = main.querySelector("#cartModal");
    const list = modal?.querySelector(".cart-summary");
    if (!list) return;

    list.innerHTML = "";
    cart.forEach(itemId => {
      const card = main.querySelector(`#${itemId}`);
      if (card) {
        const title = card.querySelector(".product-title")?.textContent || "Item";
        const price = card.querySelector(".price-tag")?.textContent || "₱0";
        const row = document.createElement("li");
        row.textContent = `${title} — ${price}`;
        list.appendChild(row);
      }
    });

    openModal("cartModal");
  }

  // 📦 Modal Controls
  function openModal(id) {
    main.querySelector(`#${id}`)?.classList.add("visible");
    main.querySelector(".modal-backdrop")?.classList.add("visible");
  }

  function closeModal(id) {
    main.querySelector(`#${id}`)?.classList.remove("visible");
    main.querySelector(".modal-backdrop")?.classList.remove("visible");
  }

  // 🔍 Live Search
  const searchInput = main.querySelector('input[type="search"]');
  searchInput?.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    main.querySelectorAll(".product-card").forEach(card => {
      const title = card.querySelector(".product-title")?.textContent.toLowerCase() || "";
      card.style.display = title.includes(keyword) ? "block" : "none";
    });
  });

  // 🎬 Fade-in Effect
  const productCards = main.querySelectorAll(".product-card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.1 });

  productCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 100}ms`;
    observer.observe(card);
  });

  // 📦 Sticky Cart Bar
  const orderBar = main.querySelector(".order-bar");
  let summaryRefreshTimeout;

  if (orderBar) {
    window.addEventListener("scroll", () => {
      orderBar.classList.toggle("visible", window.scrollY > 300);
      clearTimeout(summaryRefreshTimeout);
      summaryRefreshTimeout = setTimeout(showOrderSummary, 300);
    });

    orderBar.querySelector("button")?.addEventListener("click", () => {
      showOrderSummary();
    });
  }

  // 🧹 Escape Key to Close Modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      main.querySelectorAll(".modal.visible")?.forEach(modal => modal.classList.remove("visible"));
      main.querySelector(".modal-backdrop")?.classList.remove("visible");
    }
  });

  // 🧾 Checkout Button
  main.querySelector("#checkoutBtn")?.addEventListener("click", () => {
    showToast("☕ Order placed! Thank you.");
    cart = [];
    saveCart();
    updateCartCount();
    closeModal("cartModal");
  });

  // 🛎️ Back to Sign-In Trigger
  document.getElementById("backToSignIn")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("signInButton")?.click();
  });

  // 🧈 Loader Toggle
  function toggleLoader(show = true) {
    const loader = main.querySelector(".loader");
    if (loader) loader.style.display = show ? "block" : "none";
  }

  // 🧁 Interactive Order Buttons
  main.querySelectorAll(".order-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const product = btn.closest(".product-card")?.id;
      if (product) addToCart(product);
      btn.classList.add("added");
      btn.textContent = "✓ Added!";
      setTimeout(() => {
        btn.classList.remove("added");
        btn.textContent = "Order Now";
      }, 2000);
    });
  });

  // 🎯 Initial Setup
  document.getElementById("mainContent")?.classList.remove("hidden");
  updateCartCount();
  toggleLoader(false);
});
