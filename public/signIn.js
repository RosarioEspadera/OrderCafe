window.addEventListener("DOMContentLoaded", () => {
  const signInModal = document.getElementById("signInModal");
  const signInBtn = document.getElementById("signInBtn");
  const closeBtn = document.getElementById("closeSignIn");
  const loginMessage = document.getElementById("loginMessage");
  const mainContent = document.getElementById("mainContent");

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    signInModal.showModal();
    document.body.classList.add("modal-open");
    mainContent.style.display = "none";
  } else {
    mainContent.style.display = "block";
    signInBtn.style.display = "none";
  }

  signInBtn.addEventListener("click", () => {
    signInModal.showModal();
    document.body.classList.add("modal-open");
  });

  signInModal.addEventListener("click", (e) => {
    const rect = signInModal.getBoundingClientRect();
    const clickedInside = e.clientX >= rect.left &&
                          e.clientX <= rect.right &&
                          e.clientY >= rect.top &&
                          e.clientY <= rect.bottom;
    if (!clickedInside) {
      signInModal.close();
      document.body.classList.remove("modal-open");
    }
  });

  document.getElementById("signInForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("signInEmail").value.trim();
    const passwordInput = document.getElementById("signInPassword").value.trim();
    const validEmail = "admin@ordercafe.com";
    const validPassword = "coffee123";

    if (emailInput === validEmail && passwordInput === validPassword) {
      localStorage.setItem("isLoggedIn", "true");
      loginMessage.textContent = "Welcome back, admin!";
      loginMessage.style.color = "#4B3F2F";
      mainContent.style.display = "block";
      signInBtn.style.display = "none";

      setTimeout(() => {
        signInModal.close();
        loginMessage.textContent = "";
      }, 1500);
    } else {
      loginMessage.textContent = "Invalid credentials. Try again ☕";
      loginMessage.style.color = "#C0392B";
    }
  });

  closeBtn.addEventListener("click", () => {
    signInModal.close();
    document.body.classList.remove("modal-open");
    document.getElementById("signInForm").reset();
    loginMessage.textContent = "";
  });
});
