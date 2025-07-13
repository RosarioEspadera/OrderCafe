import { showToast } from './toast.js';
document.addEventListener("DOMContentLoaded", () => {
    emailjs.init("AqvkFhQnxowOJda9J");
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  if (!placeOrderBtn) return;

  placeOrderBtn.addEventListener("click", () => {
    // 🛒 Get cart & user data
    const cart = JSON.parse(localStorage.getItem("orderCafeCart")) || [];
    const user = JSON.parse(localStorage.getItem("orderCafeUser"));

    if (!user || cart.length === 0) {
      showToast("Missing user or cart data ☕");
      return;
    }

    // 🧾 Compile order details
    const items = cart.map(item => {
      const name = item.name || "Unnamed Item";
      const price = typeof item.price === "number" ? item.price.toFixed(2) : "0.00";
      return `${name} — $${price}`;
    }).join("\n");

    const total = cart.reduce((sum, item) => {
      return sum + (typeof item.price === "number" ? item.price : 0);
    }, 0);

    // 📬 Send email via EmailJS
    emailjs.send("service_epydqmi", "template_vzuexod", {
      to_name: user.username || "Guest",
      from_name: "OrderCafe",
      message: `Your order has been confirmed!\n\n${items}\n\nTotal: $${total.toFixed(2)}`,
      reply_to: "rosario@ordercafe.com"
    })
    .then(() => {
      showToast("📩 Confirmation sent to your inbox");
    })
    .catch((err) => {
      console.error("EmailJS error:", err);
      showToast("Failed to send receipt ☁️");
    });
  });
});
