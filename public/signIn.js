document.addEventListener("DOMContentLoaded", () => {
  const signInBtn = document.getElementById("signInBtn");
  const signInModal = document.getElementById("signInModal");
  const closeBtn = document.getElementById("closeSignIn");
  const signInForm = document.getElementById("signInForm");
  const loginMessage = document.getElementById("loginMessage");

  // Safety check to prevent runtime errors
  if (!signInBtn || !signInModal || !closeBtn || !signInForm || !loginMessage) {
    console.warn("Missing one or more required elements.");
    return;
  }

  // Show modal on button click
  signInBtn.addEventListener("click", () => {
    signInModal.showModal();
    document.body.classList.add("modal-open");
  });

  // Close modal when clicking outside
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

  // Simulate sign-in (purely aesthetic)
  signInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    loginMessage.textContent = "Welcome! ☕ This is just for fun — enjoy exploring freely!";
    loginMessage.style.color = "#4B3F2F";

    setTimeout(() => {
      loginMessage.textContent = "";
      signInModal.close();
      document.body.classList.remove("modal-open");
      signInForm.reset();
    }, 1500);
  });

  // Close modal via close button
  closeBtn.addEventListener("click", () => {
    signInModal.close();
    document.body.classList.remove("modal-open");
    signInForm.reset();
    loginMessage.textContent = "";
  });
});

