window.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("orderCafeUser")) {
    openModal("signInModal");
  } else {
    showToast("Welcome back " + localStorage.getItem("orderCafeUser"));
  }
});
