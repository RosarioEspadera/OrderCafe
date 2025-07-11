window.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("orderCafeUser")) {
    openModal("signInModal");
  }
});
