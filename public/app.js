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
      const price = parseFloat(
        this.querySelector(".price").textContent.replace("$", "")
      );
      // Instead of immediately adding the order, ask for the size:
      showSizeOptions(item, price);
    });
  });

  // Function to display the size options modal
  function showSizeOptions(item, price) {
    // Create a modal container
    const modal = document.createElement("div");
    modal.className = "size-modal";

    // The modal's inner HTML (a simple box with size options)
    modal.innerHTML = `
      <div class="size-modal-content">
          <span class="close">&times;</span>
          <h3>Select Size for ${item}</h3>
          <button class="size-option" data-size="Small">Small</button>
          <button class="size-option" data-size="Medium">Medium</button>
          <button class="size-option" data-size="Large">Large</button>
      </div>
    `;

    // Append the modal to the document and display it
    document.body.appendChild(modal);
    modal.style.display = "block";

    // Close the modal when clicking on the close button
    modal.querySelector(".close").addEventListener("click", () => {
      modal.remove();
    });

    // When a size option is clicked, update the order with the adjusted price
    modal.querySelectorAll(".size-option").forEach(button => {
      button.addEventListener("click", function () {
        const size = this.getAttribute("data-size");
        let modifiedPrice = price;
        // Adjust the price based on the selected size
        if (size === "Small") {
          modifiedPrice = price * 0.9; // 10% decrease
        } else if (size === "Large") {
          modifiedPrice = price * 1.1; // 10% increase
        }
        // Round to 2 decimal places
        modifiedPrice = parseFloat(modifiedPrice.toFixed(2));
        // Call addToOrder with the adjusted price and size
        addToOrder(item, modifiedPrice, size);
        modal.remove();
      });
    });
  } // End of showSizeOptions

  // ---------- Global Variables & Order Functions ----------

  // Global array to store order items
  const orders = [];

  // Function to add an item to the order
  function addToOrder(item, price, size) {
    orders.push({ name: item, price: price, size: size });
    updateOrderSummary();
    alert(`${item} (${size}) ($${price.toFixed(2)}) added to your order!`);
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

