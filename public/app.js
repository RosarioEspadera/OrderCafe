function initializeOrder() {
  document.addEventListener("DOMContentLoaded", () => {
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

    document.querySelectorAll(".accordion-toggle").forEach(toggle => {
      toggle.addEventListener("click", () => {
        const section = toggle.parentElement;
        section.classList.toggle("expanded");
      });
    });

document.querySelectorAll(".menu-button").forEach(button => {
      button.addEventListener("click", () => {
        const item = button.getAttribute("data-title");
        const price = parseFloat(button.querySelector(".price").textContent.replace("$", ""));
        const hasSize = button.getAttribute("data-size") === "true";

        if (hasSize) {
          showSizeOptions(item, price);
        } else {
          addToOrder(item, price);
        }
      });
    });
  });
}



function showSizeOptions(item, price) {
  const modal = document.createElement("div");
  modal.className = "size-modal";
  modal.innerHTML = `
    <button class="close-btn">×</button>
    <h2>Select Size for ${item}</h2>
    <div class="size-options">
      <button data-size="Small">Small</button>
      <button data-size="Medium">Medium</button>
      <button data-size="Large">Large</button>
    </div>
    <div id="confirm-section" style="display: none;">
      <button id="confirm-size-btn">Confirm</button>
    </div>
  `;

  document.body.appendChild(modal);


 modal.querySelector(".close-btn").addEventListener("click", () => {
  modal.remove();
});
const backdrop = document.createElement("div");
backdrop.className = "size-backdrop";
backdrop.appendChild(modal);
document.body.appendChild(backdrop);

// Close when clicking outside the modal
backdrop.addEventListener("click", e => {
  if (e.target === backdrop) backdrop.remove();
});

  let selectedSize = null;
  let modifiedPrice = price;

  
const confirmButton = modal.querySelector("#confirm-size-btn");

confirmButton.addEventListener("click", function () {
  if (selectedSize) {
    // Add item to the order
    addToOrder(item, modifiedPrice, selectedSize);

    // Remove the entire backdrop to clear blur + modal
    modal.closest(".size-backdrop")?.remove();
  }
});

  
    const confirmSection = modal.querySelector("#confirm-section");
    const sizeButtons = modal.querySelectorAll(".size-options button");
sizeButtons.forEach((btn, i) => {
  setTimeout(() => {
    btn.classList.add("option-animate");
  }, i * 100);

  btn.addEventListener("click", function () {
    confirmSection.style.display = "block";
    confirmSection.classList.add("show");

    sizeButtons.forEach(b => {
      b.classList.remove("selected-size");
      b.textContent = b.getAttribute("data-size");
    });

    btn.classList.add("selected-size");
    btn.textContent = `✓ ${btn.getAttribute("data-size")}`;
    selectedSize = btn.getAttribute("data-size");

    modifiedPrice = price;
    if (selectedSize === "Small") modifiedPrice = price * 0.9;
    else if (selectedSize === "Large") modifiedPrice = price * 1.1;
    modifiedPrice = parseFloat(modifiedPrice.toFixed(2));
  });
});

  
  modal.querySelector("#confirm-size-btn").addEventListener("click", function () {
    if (selectedSize) {
      addToOrder(item, modifiedPrice, selectedSize);
      modal.remove();
    }
  });
}


  const orders = [];


  function addToOrder(item, price, size) {
    orders.push({ name: item, price: price, size: size });
    updateOrderSummary();

  }


  function calculateTotal() {
    return orders.reduce((total, order) => total + order.price, 0);
  }

 
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
    name,
    address,
    time,
    email: emailRecipient,
    totalPrice: calculateTotal().toFixed(2)
  };

 emailjs
    .send("service_epydqmi", "template_vzuexod", details)
    .then(response => {
      console.log("SUCCESS!", response.status, response.text);
      const msg = document.getElementById("orderSuccessMsg");
      if (msg) {
        msg.style.display = "block";
        msg.classList.add("animated");
        setTimeout(() => {
          msg.style.display = "none";
          msg.classList.remove("animated");
        }, 2500);
      }
    })
    .catch(error => {
      console.error("EmailJS Error:", error);
      alert(`Failed to send order: ${error.text || "Unknown error"}`);
    });
}
initializeOrder();
