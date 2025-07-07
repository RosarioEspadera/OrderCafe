// 🌟 Global state
const orders = [];

// ✅ Initialization
function initializeOrder() {
  if (typeof emailjs !== "undefined") {
    emailjs.init("AqvkFhQnxowOJda9J");
  } else {
    console.error("EmailJS library is not loaded.");
  }

  // Accordion toggle logic
  document.querySelectorAll(".accordion-toggle").forEach(toggle => {
    toggle.addEventListener("click", () => {
      toggle.parentElement.classList.toggle("expanded");
    });
  });

  // Menu button handler
  document.querySelectorAll(".menu-button").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.getAttribute("data-title");
      const price = parseFloat(button.querySelector(".price").textContent.replace("$", ""));
      const hasSize = button.getAttribute("data-size") === "true";
      hasSize ? showSizeOptions(item, price) : addToOrder(item, price);
    });
  });

  // Send order
  const sendOrderBtn = document.getElementById("sendOrderBtn");
  if (sendOrderBtn) {
    sendOrderBtn.addEventListener("click", sendOrder);
  }

  // Auto-fill address from geolocation
  const addressInput = document.getElementById("address");
  if (addressInput && navigator.geolocation) {
    let isFetchingAddress = false;
    addressInput.addEventListener("click", () => {
      if (isFetchingAddress) return;
      isFetchingAddress = true;
      navigator.geolocation.getCurrentPosition(position => {
        fetchAddressFromCoords(position.coords.latitude, position.coords.longitude, addressInput);
        setTimeout(() => { isFetchingAddress = false }, 3000);
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", initializeOrder);

// 🧾 Size Selection Modal
function showSizeOptions(item, price) {
  const modal = document.createElement("div");
  const backdrop = document.createElement("div");
  let selectedSize = null;
  let modifiedPrice = price;

  modal.innerHTML = `
    <button class="close-btn">×</button>
    <h2>Select Size for ${item}</h2>
    <div class="size-options">
      <button data-size="Small">Small</button>
      <button data-size="Medium">Medium</button>
      <button data-size="Large">Large</button>
    </div>
    <div class="size-confirm-wrap" style="display:none;">
      <button class="modal-confirm-btn">Confirm</button>
    </div>
  `;
modal.classList.add("modal-box");
backdrop.classList.add("backdrop-overlay", "fade-in");

modal.setAttribute("role", "dialog");
modal.setAttribute("aria-labelledby", "modal-title");

  modal.querySelector(".close-btn").addEventListener("click", () => {
  backdrop.remove();
});

  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  const sizeButtons = modal.querySelectorAll(".size-options button");
  const confirmSection = modal.querySelector(".size-confirm-wrap");
  const confirmBtn = modal.querySelector(".modal-confirm-btn");

  // 🎯 Confirm button logic
  confirmBtn.addEventListener("click", () => {
    if (selectedSize) {
      addToOrder(item, modifiedPrice, selectedSize);
      backdrop.remove();
    } else {
      alert("Please select a size first.");
    }
  });

// 🌀 Animate size options
sizeButtons.forEach((btn, i) => {
  setTimeout(() => btn.classList.add("option-animate"), i * 100);

  btn.addEventListener("click", () => {
    // Deselect others
    sizeButtons.forEach(b => {
      b.classList.remove("selected-size");
      b.textContent = b.getAttribute("data-size");
    });

    // Select this one
    btn.classList.add("selected-size");
    selectedSize = btn.getAttribute("data-size");

    // Reveal confirm button
    confirmSection.style.display = 'block';
    confirmSection.classList.add("confirm-animate");
  });
});  // <-- closes forEach

}  // <-- closes showSizeOptions

// 🛒 Order Logic
function addToOrder(item, price, size = null) {
  orders.push({ name: item, price, size });
  updateOrderSummary();
}

function updateOrderSummary() {
  const listEl = document.getElementById("orderList");
  const totalEl = document.getElementById("orderTotal");

  if (!listEl || !totalEl) return;

  listEl.innerHTML = "";
  orders.forEach(order => {
    const sizeText = order.size ? ` (${order.size})` : "";
    const li = document.createElement("li");
    li.textContent = `${order.name}${sizeText} - $${order.price.toFixed(2)}`;
    listEl.appendChild(li);
  });

  totalEl.innerText = calculateTotal().toFixed(2);
  document.getElementById("confirm-section").style.display = "block";
}

function calculateTotal() {
  return orders.reduce((sum, order) => sum + order.price, 0);
}

// 📍 Address Auto-fill
function fetchAddressFromCoords(lat, lng, input) {
  const apiKey = "432acce8c24a4f58ac8576dc40dd5525";
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.results?.length) {
        input.value = data.results[0].formatted;
        input.classList.add("autofilled");
      }
    })
    .catch(err => console.error("Reverse geocoding failed:", err));
}

// ✉️ Order Submission
function sendOrder() {
  const name = document.getElementById("name")?.value.trim();
  const address = document.getElementById("address")?.value.trim();
  const time = document.getElementById("time")?.value;
  const email = document.getElementById("email")?.value.trim();

  if (!name || !address || !time || !email || orders.length === 0) {
    alert("Please complete all fields and add at least one item.");
    return;
  }

  const details = {
    orderDetails: "Your order has been received",
    orders: orders.map(o => `${o.name} ($${o.price.toFixed(2)})`).join(", "),
    name,
    address,
    time,
    email,
    totalPrice: calculateTotal().toFixed(2)
  };

  emailjs.send("service_epydqmi", "template_vzuexod", details)
    .then(response => {
      console.log("Order sent!", response.status, response.text);
      const msg = document.getElementById("orderSuccessMsg");
      if (msg) {
        msg.style.display = "block";
        msg.classList.add("animated");
        setTimeout(() => msg.classList.remove("animated"), 2500);
      }

      // Reset form & state
      document.getElementById("order-form")?.reset();
      orders.length = 0;
      updateOrderSummary();
      document.getElementById("confirm-section").style.display = "none";
    })
    .catch(error => {
      console.error("EmailJS error:", error);
      alert(`Failed to send order: ${error.text || "Unknown error"}`);
    });
}
