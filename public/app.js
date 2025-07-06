document.addEventListener("DOMContentLoaded", () => {
  // Initialize EmailJS (ensure the library is loaded via a separate <script> tag)
  if (typeof emailjs !== "undefined") {
    emailjs.init("AqvkFhQnxowOJda9J");
  } else {
    console.error("EmailJS library is not loaded.");
  }

  const sendOrderBtn = document.getElementById("sendOrderBtn");
  if (sendOrderBtn) {
    sendOrderBtn.addEventListener("click", sendOrder);
  } else {
    console.error("sendOrderBtn not found in the DOM");
  }

  // Attach event listeners for all menu buttons
 document.querySelectorAll(".menu-button").forEach(button => {
  button.addEventListener("click", function () {
    const item = this.getAttribute("data-title");
    const price = parseFloat(this.querySelector(".price").textContent.replace("$", ""));
    const hasSize = this.getAttribute("data-size") === "true";

    if (hasSize) {
      showSizeOptions(item, price);
    } else {
      addToOrder(item, price);
    }
  });
});
  // Function to display the size options modal
function showSizeOptions(item, price) {
  const modal = document.createElement("div");
  modal.className = "size-modal";
modal.innerHTML = `
  <div class="size-modal">
    <button class="close-btn">×</button>
    <h2>Select Size for ${item}</h2>
    <div class="size-options">
      <button data-size="Small">Small</button>
      <button data-size="Medium">Medium</button>
      <button data-size="Large">Large</button>
    </div>
    <div class="confirm-wrap">
      <button id="confirm-size-btn">Confirm</button>
    </div>
  </div>
`;

  document.body.appendChild(modal);

  // Close modal handler
 modal.querySelector(".close-btn").addEventListener("click", () => {
  modal.remove();
});


  let selectedSize = null;
  let modifiedPrice = price;

  // Show confirm button after size selected
  modal.querySelectorAll(".size-options button").forEach(button => {
    button.addEventListener("click", function () {
      selectedSize = this.getAttribute("data-size");
      modifiedPrice = price;
      if (selectedSize === "Small") modifiedPrice = price * 0.9;
      else if (selectedSize === "Large") modifiedPrice = price * 1.1;
      modifiedPrice = parseFloat(modifiedPrice.toFixed(2));
      modal.querySelector("#confirm-section").style.display = "block";
    });
  });

  // Confirm handler
  modal.querySelector("#confirm-size-btn").addEventListener("click", function () {
    if (selectedSize) {
      addToOrder(item, modifiedPrice, selectedSize);
      modal.remove();
    }
  });
}

  // ---------- Global Variables & Order Functions ----------

  // Global array to store order items
  const orders = [];

  // Function to add an item to the order (alert removed)
  function addToOrder(item, price, size) {
    orders.push({ name: item, price: price, size: size });
    updateOrderSummary();
    // No alert needed
  }

  // Function to calculate the total price of the order
  function calculateTotal() {
    return orders.reduce((total, order) => total + order.price, 0);
  }

  // Function to update the order summary display on the page
  function updateOrderSummary() {
    const orderListElem = document.getElementById("orderList");
    if (!orderListElem) return;
    orderListElem.innerHTML = "";

    orders.forEach(order => {
      const li = document.createElement("li");
      const sizeText = order.size ? ` (${order.size})` : "";
      li.textContent = `${order.name}${sizeText} - $${order.price.toFixed(2)}`;
      orderListElem.appendChild(li);
    });

    const orderTotalElem = document.getElementById("orderTotal");
    if (orderTotalElem) {
      orderTotalElem.innerText = calculateTotal().toFixed(2);
    }
  }

  // ---------- Display & Sending Order Functions ----------

  // Function to display a confirmation preview with dynamic placeholders
  function displayConfirmation(details) {
    document.getElementById("confirmOrderDetails").innerText = details.orderDetails;
    document.getElementById("confirmOrders").innerText = details.orders;
    document.getElementById("confirmName").innerText = details.name;
    document.getElementById("confirmAddress").innerText = details.address;
    document.getElementById("confirmTime").innerText = details.time;
    document.getElementById("confirmEmail").innerText = details.email;
    document.getElementById("confirmTotalPrice").innerText = "$" + details.totalPrice;
    document.getElementById("orderConfirmationPreview").style.display = "block";
  }

  // Function to send the order details via EmailJS
  function sendOrder() {
    if (orders.length === 0) {
      alert("No items in your order!");
      return;
    }
    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const time = document.getElementById("time").value;
    const emailRecipient = document.getElementById("email").value.trim();

    if (!name || !address || !time || !emailRecipient) {
      alert("Please fill in all the details!");
      return;
    }

    const details = {
      orderDetails: "Your order has been received",
      orders: orders.map(order => `${order.name} ($${order.price.toFixed(2)})`).join(", "),
      name: name,
      address: address,
      time: time,
      email: emailRecipient,
      totalPrice: calculateTotal().toFixed(2)
    };

    emailjs
      .send("service_epydqmi", "template_vzuexod", details)
      .then(response => {
        console.log("SUCCESS!", response.status, response.text);
        alert("Order sent successfully!");
      })
      .catch(error => {
        console.error("EmailJS Error:", error);
        alert(`Failed to send order: ${error.text || "Unknown error"}`);
      });
  }
});
