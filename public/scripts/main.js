// 🛎️ Toast Notification
function showToast(message = "Added to cart!", duration = 3000) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("fade-out"), duration - 500);
  setTimeout(() => toast.remove(), duration);
}

// 🛍️ Sticky Bottom Bar State
window.addEventListener("scroll", () => {
  const bar = document.querySelector(".order-bar");
  if (window.scrollY > 300) {
    bar.classList.add("visible");
  } else {
    bar.classList.remove("visible");
  }
  let summaryRefreshTimeout;

window.addEventListener("scroll", () => {
  const bar = document.querySelector(".order-bar");
  if (window.scrollY > 300) {
    bar.classList.add("visible");
  } else {
    bar.classList.remove("visible");
  }

  clearTimeout(summaryRefreshTimeout);
  summaryRefreshTimeout = setTimeout(() => {
    showOrderSummary();
  }, 300); // updates after 300ms of no scroll
});

const searchInput = document.querySelector('input[type="search"]');
searchInput?.addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  document.querySelectorAll(".product-card").forEach((card) => {
    const title = card.querySelector(".product-title")?.textContent.toLowerCase();
    card.style.display = title.includes(keyword) ? "block" : "none";
  });
});

// 🎬 Product Card Fade-in on Scroll
const productCards = document.querySelectorAll(".product-card");

const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 });
const orderBarButton = document.querySelector(".order-bar button");
orderBarButton?.addEventListener("click", () => {
  openModal("cartModal"); // Example cart modal ID
});
productCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 100}ms`;
});

productCards.forEach(card => cardObserver.observe(card));

// 🔁 Loader Toggle
function toggleLoader(show = true) {
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.display = show ? "block" : "none";
  }
}

// 📦 Modal Controls
function openModal(modalId) {
  document.getElementById(modalId)?.classList.add("visible");
  document.querySelector(".modal-backdrop")?.classList.add("visible");
}

function closeModal(modalId) {
  document.getElementById(modalId)?.classList.remove("visible");
  document.querySelector(".modal-backdrop")?.classList.remove("visible");
}
let cart = JSON.parse(localStorage.getItem("orderCafeCart")) || [];

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

function updateCartCount() {
  const countBadge = document.querySelector(".cart-count");
  if (countBadge) {
    countBadge.textContent = cart.length;
    countBadge.classList.add("visible");
  }
}
function showOrderSummary() {
  const modal = document.getElementById("cartModal");
  const list = modal?.querySelector(".cart-summary");
  if (!list) return;

  list.innerHTML = "";

  cart.forEach(itemId => {
    const itemCard = document.querySelector(`#${itemId}`);
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

// 🔑 Escape Key to Close Modals
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.visible").forEach(modal => modal.classList.remove("visible"));
    document.querySelector(".modal-backdrop")?.classList.remove("visible");
  }
});
document.getElementById("checkoutBtn")?.addEventListener("click", () => {
  showToast("☕ Order placed! Thank you.");
  cart = [];
  saveCart();
  updateCartCount();
  closeModal("cartModal");
});
window.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

document.querySelectorAll(".order-button").forEach((btn) => {
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

