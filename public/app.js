// ---------- EmailJS Initialization & DOMContentLoaded Setup ----------

// When the DOM is ready, initialize EmailJS and attach event listeners.
document.addEventListener("DOMContentLoaded", () => {
  // Initialize EmailJS (make sure the library is loaded via a separate <script src="..."> tag in HTML)
  if (typeof emailjs !== "undefined") {
    emailjs.init("AqvkFhQnxowOJda9J");
  } else {
    console.error("EmailJS library is not loaded.");
  }

  // Attach event listeners for all menu buttons
  document.querySelectorAll(".menu-button").forEach(button => {
    button.addEventListener("click", function () {
      const item = this.getAttribute("data-title");
      const price = parseFloat(this.querySelector(".price").textContent.replace("$", ""));
      addToOrder(item, price);
    });
  });
});

// ---------- Global Variables & Order Functions ----------

// Global array to store order items
const orders = [];

// Function to add an item to the order
function addToOrder(item, price) {
  orders.push({ name: item, price: price });
  updateOrderSummary();
  alert(`${item} ($${price.toFixed(2)}) added to your order!`);
}

// Function to calculate the total price of the order
function calculateTotal() {
  return orders.reduce((total, order) => total + order.price, 0);
}

// Function to update the order summary display on the page
function updateOrderSummary() {
  const orderListElem = document.getElementById("orderList");
  if (!orderListElem) return;

  orderListElem.innerHTML = ""; // Clear current list

  orders.forEach(order => {
    const li = document.createElement("li");
    li.textContent = `${order.name} - $${order.price.toFixed(2)}`;
    orderListElem.appendChild(li);
  });

  // Update the total price display
  const orderTotalElem = document.getElementById("orderTotal");
  if (orderTotalElem) {
    orderTotalElem.innerText = calculateTotal().toFixed(2);
  }
}

// ---------- Display & Sending Order ----------

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
