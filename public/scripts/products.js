import { cart, saveCart, renderCartItems } from "./cart.js";
import { showToast } from "./toast.js";

export const initProductEvents = () => {
  const cards = document.querySelectorAll(".product-card");
  cards.forEach(card => {
    const name = card.querySelector(".product-title")?.textContent?.trim();
    const priceText = card.querySelector(".price-tag")?.textContent?.trim();
    const price = parseFloat(priceText?.replace("$", ""));
    const button = card.querySelector(".order-button");
    button?.addEventListener("click", () => {
      cart.push({ name, price });
      saveCart();
      renderCartItems();
      showToast(`🛒 ${name} added to your cart`);
    });
  });
};
