document.getElementById("signUpBtn").onclick = () => {
  const newUsername = document.getElementById("newUsername").value;
  const newPassword = document.getElementById("newPassword").value;

  if (!newUsername || !newPassword) {
    showToast("Please fill in all fields");
    return;
  }

  localStorage.setItem("orderCafeUser", newUsername);
  closeModal("signUpModal");
  openModal("mainModal");
  showToast(`Welcome, ${newUsername}!`);
};
