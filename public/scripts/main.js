window.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("mainContent");
  if (!main) return;

  let cart = JSON.parse(localStorage.getItem("orderCafeCart")) || [];
  let summaryRefreshTimeout;

  // 🛎️ Toast Notification
  function showToast(message = "Added to cart!", duration = 3000) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("fade-out"), duration - 500);
    setTimeout(() => toast.remove(), duration);
  }

  // 🛍️ Sticky Bottom Bar
  const orderBar = main.querySelector(".order-bar");
  if (orderBar) {
    window.addEventListener("scroll", () => {
      orderBar.classList.toggle("visible", window.scrollY > 300);
      clearTimeout(summaryRefreshTimeout);
      summaryRefreshTimeout = setTimeout(showOrderSummary, 300);
    });

    orderBar.querySelector("button")?.addEventListener("click", () => {
      openModal("cartModal");
    });
  }

  // 🔍 Live Search
  const searchInput = main.querySelector('input[type="search"]');
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const keyword = e.target.value.toLowerCase();
      main.querySelectorAll(".product-card").forEach((card) => {
        const title = card.querySelector(".product-title")?.textContent.toLowerCase() || "";
        card.style.display = title.includes(keyword) ? "block" : "none";
      });
    });
  }

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
function showMainContent() {
  // Reveal mainContent
  document.getElementById("mainContent")?.classList.remove("hidden");

  // Hide any other modals or overlays
  document.getElementById("signInModal")?.classList.remove("visible");
  document.querySelector(".modal-backdrop")?.classList.remove("visible");
}
document.getElementById("menuBtn")?.addEventListener("click", showMainContent);

  // 🔁 Loader Control
  function toggleLoader(show = true) {
    const loader = main.querySelector(".loader");
    if (loader) loader.style.display = show ? "block" : "none";
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

  // 🛒 Cart Management
  function updateCartCount() {
    const badge = main.querySelector(".cart-count");
    if (badge) {
      badge.textContent = cart.length;
      badge.classList.add("visible");
    }
  }

  function saveCart() {
    localStorage.setItem("orderCafeCart", JSON.stringify(cart));
  }

  function addToCart(itemId) {
    if (!cart.includes(itemId)) {
      cart.push(itemId);
      saveCart();
      showToast("✓ Saved to Cart");
      updateCartCount();
    }
  }

  function showOrderSummary() {
    const modal = main.querySelector("#cartModal");
    const list = modal?.querySelector(".cart-summary");
    if (!list) return;

    list.innerHTML = "";
    cart.forEach(itemId => {
      const itemCard = main.querySelector(`#${itemId}`);
      if (itemCard) {
        const title = itemCard.querySelector(".product-title")?.textContent || "Item";
        const price = itemCard.querySelector(".price-tag")?.textContent || "₱0";
        const row = document.createElement("li");
        row.textContent = `${title} — ${price}`;
        list.appendChild(row);
      }
    });

    openModal("cartModal");
  }

  // 🔑 Escape Key Closes Modals
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      main.querySelectorAll(".modal.visible").forEach(modal => modal.classList.remove("visible"));
      main.querySelector(".modal-backdrop")?.classList.remove("visible");
    }
  });

  // 🛍️ Checkout Button
  main.querySelector("#checkoutBtn")?.addEventListener("click", () => {
    showToast("☕ Order placed! Thank you.");
    cart = [];
    saveCart();
    updateCartCount();
    closeModal("cartModal");
  });

  // 🧃 Order Buttons
  main.querySelectorAll(".order-button").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.add("added");
      btn.textContent = "✓ Added!";
      showToast("Item added to cart!");
      setTimeout(() => {
        btn.classList.remove("added");
        btn.textContent = "Order Now";
      }, 2000);
    });
  });

  updateCartCount();
});


