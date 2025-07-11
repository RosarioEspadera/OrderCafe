document.getElementById("confirmSend").addEventListener("click", () => {
  emailjs.send("service_epydqmi", "template_vzuexod", { ... });
  // clean up cart and UI here
});
