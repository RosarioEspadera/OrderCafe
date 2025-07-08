// 🌟 Global state
const orders = [];

// 🗺 Reverse-geocode helper (top-level, not nested)
async function fetchAddressFromCoords(lat, lng, input) {
  const apiKey = "432acce8c24a4f58ac8576dc40dd5525";
  const url    = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`;

  try {
    const res  = await fetch(url);
    const data = await res.json();

    if (!data.results?.length) {
      throw new Error("No address found");
    }

    input.value = data.results[0].formatted;
    input.classList.add("autofilled");
  }
  catch (err) {
    console.error("Reverse geocoding failed:", err);
    throw err;
  }
}

// 🚀 Initialization
function initializeOrder() {
  // EmailJS setup
  if (typeof emailjs !== "undefined") {
    emailjs.init("AqvkFhQnxowOJda9J");
  } else {
    console.error("EmailJS library is not loaded.");
  }

  // Menu button logic
  document.querySelectorAll(".menu-button").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.dataset.title;
      const price = parseFloat(button.querySelector(".price").textContent.replace("$", ""));
      const hasSize = button.dataset.size === "true";
      hasSize ? showSizeOptions(item, price) : addToOrder(item, price);
    });
  });

  // Accordion toggles
  document.querySelectorAll(".accordion-toggle").forEach(toggle => {
    toggle.addEventListener("click", () =>
      toggle.parentElement.classList.toggle("expanded")
    );
  });

  // Submit order
  document.getElementById("sendOrderBtn")?.addEventListener("click", sendOrder);

  // 📍 Use My Location
  const geoBtn = document.getElementById("useLocationBtn");
  const addressInput = document.getElementById("custAddress");
  if (geoBtn && addressInput && navigator.geolocation) {
    geoBtn.addEventListener("click", async () => {
      geoBtn.disabled = true;
      geoBtn.textContent = "…";
      try {
        const position = await new Promise((res, rej) =>
          navigator.geolocation.getCurrentPosition(res, rej, {
            enableHighAccuracy: true,
            timeout: 10000
          })
        );
        await fetchAddressFromCoords(
          position.coords.latitude,
          position.coords.longitude,
          addressInput
        );
      } catch (err) {
        alert("Couldn’t auto-fill your address. Please enter it manually.");
      } finally {
        geoBtn.disabled = false;
        geoBtn.textContent = "📍";
      }
    });
  }
}


// Kick everything off
document.addEventListener("DOMContentLoaded", initializeOrder);

function showSizeOptions(item, price) {
  // Create nodes
  const modal = document.createElement("div");
  modal.classList.add("modal-box");
  const backdrop = document.createElement("div");
  
  // Track selection + adjusted price
  let selectedSize  = null;
  let modifiedPrice = price;

  // Inject inner HTML
  modal.innerHTML = `
    <button class="close-btn" aria-label="Close">×</button>
    <h2 id="modal-title">Select Size for ${item}</h2>
    <div class="size-options">
      <button data-size="Small">Small</button>
      <button data-size="Medium">Medium</button>
      <button data-size="Large">Large</button>
    </div>
    <div class="size-confirm-wrap" style="display:none;">
      <button class="modal-confirm-btn">Confirm</button>
    </div>
  `;
  // Apply classes & accessibility
modal.setAttribute("role", "dialog");
modal.setAttribute("aria-labelledby", "modal-title");

// Mount to DOM
backdrop.classList.add("backdrop-overlay", "active");
backdrop.appendChild(modal);
document.body.appendChild(backdrop);
  document.body.classList.add('modal-open');
  document.body.classList.remove('modal-open');



  // Grab the buttons
  const sizeBtns      = modal.querySelectorAll(".size-options button");
  sizeButtons = sizeBtns;
  const confirmWrap   = modal.querySelector(".size-confirm-wrap");
  const confirmBtn    = modal.querySelector(".modal-confirm-btn");

  // 1) Size‐click handler: mark & adjust price
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
    switch (selectedSize) {
        case "Small":  modifiedPrice = +(price * 0.9).toFixed(2); break;
        case "Large":  modifiedPrice = +(price * 1.2).toFixed(2); break;
        default:       modifiedPrice = price;
      }

    // Reveal confirm button
    confirmWrap.style.display = "block";
    confirmWrap.classList.add("confirm-animate");

    // 🔥 Animate the Confirm button
    confirmBtn.classList.add("show");
  });
});

// Handle close button
modal.querySelector(".close-btn").addEventListener("click", () => backdrop.remove());

  confirmBtn.addEventListener("click", () => {
    if (!selectedSize) return alert("Please select a size first.");
    addToOrder(item, modifiedPrice, selectedSize);
    backdrop.remove();
  });
}
// 🛒 Add item to order
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


// ✉️ Order Submission
// ✉️ Submit order
function sendOrder() {
  const name    = document.getElementById("name")?.value.trim();
  const address = document.getElementById("custAddress")?.value.trim();
  const time    = document.getElementById("time")?.value;
  const email   = document.getElementById("email")?.value.trim();

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
  // 🪵 Debug the payload before sending
  console.log("Sending order details:", details);
  
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
document.addEventListener("DOMContentLoaded", initializeOrder);
