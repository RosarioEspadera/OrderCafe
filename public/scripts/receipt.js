import { showToast } from './toast.js';

emailjs.init("AqvkFhQnxowOJda9J");

export function clearCart() {
  localStorage.removeItem("orderCafeCart");
  document.getElementById("cartList").innerHTML = "";
  document.getElementById("cartCount").textContent = "0";
  document.getElementById("cartTotal").textContent = "$0.00";
  document.getElementById("emptyCartMessage")?.classList.remove("hidden");
}

// 🎯 Reusable receipt sender
export function sendReceiptEmail() {
  const cart = JSON.parse(localStorage.getItem("orderCafeCart")) || [];
  const user = JSON.parse(localStorage.getItem("orderCafeUser"));

  if (!user || cart.length === 0) {
    showToast("Missing user or cart data ☕");
    return;
  }

  // 🧾 Compile item list and total
  const items = cart.map(item => {
    const name = item.name || "Unnamed Item";
    const price = typeof item.price === "number" ? item.price.toFixed(2) : "0.00";
    return `${name} — $${price}`;
  }).join("\n");

  const total = cart.reduce((sum, item) => {
    return sum + (typeof item.price === "number" ? item.price : 0);
  }, 0);

  // 📬 Send via EmailJS with address included
  emailjs.send("service_epydqmi", "template_vzuexod", {
    to_name: user.username,
    from_name: "OrderCafe",
    message: `🧾 Order Summary:\n\n${items}\n\n💵 Total: $${total.toFixed(2)}`,
    order_total: `$${total.toFixed(2)}`,
    Address: user.address || "Not provided",
    reply_to: user.email || "no-reply@ordercafe.com"
  })
  .then(() => {
    showToast("📩 Confirmation sent to your inbox");
    clearCart(); // 🧹 Clear cart after sending
  })
  .catch((err) => {
    console.error("EmailJS error:", err);
    showToast("Failed to send receipt ☁️");
  });
}

// 🖱️ Optional DOM binding — moved outside the function
document.addEventListener("DOMContentLoaded", () => {
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  placeOrderBtn?.addEventListener("click", sendReceiptEmail);
});
