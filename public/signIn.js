document.addEventListener("DOMContentLoaded", () => {
  // Get modal elements
  const signInModal = document.getElementById("signInModal");
  const signInForm = document.getElementById("signInForm");
  const signInBtn = document.getElementById("signInBtn");
  const mainContent = document.getElementById("mainContent");
  const closeBtn = document.getElementById("closeBtn");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  // Safety check: Are all key elements present?
  if (
    !signInModal || !signInForm || !signInBtn ||
    !mainContent || !closeBtn || !usernameInput || !passwordInput
  ) {
    console.error("Missing essential sign-in elements.");
    return;
  }

  // Animate modal on first load
  signInModal.showModal();
  requestAnimationFrame(() => {
    signInModal.classList.add("visible");
  });

  // Close modal with smooth transition
  function hideModalWithTransition(modal) {
    modal.classList.remove("visible");
    modal.addEventListener("transitionend", () => {
      modal.close();
    }, { once: true });
  }

  // Handle cancel button
  closeBtn.addEventListener("click", () => {
    hideModalWithTransition(signInModal);
  });

  // Handle form submission
  signInForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
      alert("Please enter both username and password.");

      // Optional: Add shake animation on validation failure
      signInModal.classList.add("shake");
      signInModal.addEventListener("animationend", () => {
        signInModal.classList.remove("shake");
      }, { once: true });

      return;
    }
    
    const puff = document.getElementById("steamPuff");
if (puff) {
  puff.classList.add("animate");
  setTimeout(() => puff.classList.remove("animate"), 1200); // reset after animation
}
    const smoke = document.getElementById("smokeTrail");
if (smoke) {
  smoke.classList.add("animate");
  setTimeout(() => smoke.classList.remove("animate"), 4000);
}

    const audio = document.getElementById("signInAudio");
if (audio) {
  audio.currentTime = 0; // rewind to start
  audio.play();          // play the sound
}


    hideModalWithTransition(signInModal);
    signInBtn.style.display = "none";
    mainContent.classList.remove("hidden");
    mainContent.classList.add("visible");
  });

  // Allow closing modal with Escape key for accessibility
  signInModal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideModalWithTransition(signInModal);
    }
  });
});



