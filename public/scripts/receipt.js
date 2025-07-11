const confirmButton = document.getElementById("confirmSend");
if (confirmButton) {
  confirmButton.addEventListener("click", () => {
    emailjs.send("service_epydqmi", "template_vzuexod", {
      to_name: "Rosario",
      from_name: "OrderCafe",
      message: "Your order has been confirmed!",
      reply_to: "rosario@ordercafe.com"
    });
  });
}
