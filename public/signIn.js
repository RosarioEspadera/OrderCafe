document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("introScreen");
  const startBtn = document.getElementById("startBtn");

  if (startBtn && introScreen) {
    startBtn.addEventListener("click", () => {
      introScreen.classList.add("hidden");
      document.body.classList.remove("modal-open"); // Just in case
    });
  }

  const signInBtn = document.getElementById("signInBtn");
  const signInModal = document.getElementById("signInModal");
  const closeBtn = document.getElementById("closeSignIn");
  const signInForm = document.getElementById("signInForm");
  const loginMessage = document.getElementById("loginMessage");

  if (!signInBtn || !signInModal || !closeBtn || !signInForm || !loginMessage) {
    console.warn("Missing one or more required elements.");
    return;
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

  closeBtn.addEventListener("click", () => {
    signInModal.close();
    document.body.classList.remove("modal-open");
    signInForm.reset();
    loginMessage.textContent = "";
  });
});
