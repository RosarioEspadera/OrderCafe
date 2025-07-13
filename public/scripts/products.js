import { addToCart } from './cart.js';

export function initProductEvents() {
  const main = document.getElementById("mainContent");
  main?.querySelectorAll(".order-button").forEach(btn => {
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
}

