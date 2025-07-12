document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const orderBtn = document.getElementById("orderBtn");
  const profileBtn = document.getElementById("profileBtn");
  const closeProfileBtn = document.getElementById("closeProfile");
  const closeOrderModalBtn = document.getElementById("closeOrderModal");
  const backToSignInBtn = document.getElementById("backToSignIn");

  const mainContent = document.getElementById("mainContent");
  const orderModal = document.getElementById("orderModal");
  const profileOverlay = document.getElementById("profileOverlay");
  const signInModal = document.getElementById("signInModal");
  const backdrop = document.querySelector(".modal-backdrop");

  const productOrderButtons = document.querySelectorAll(".order-button");
  const signInButtons = signInModal?.querySelectorAll("button:not(#backToSignIn)");

  // Select ALL modal-related buttons
  const modalButtons = [
    ...document.querySelectorAll("#orderModal button"),
    ...document.querySelectorAll("#profileOverlay button"),
    ...document.querySelectorAll("#signInModal button:not(#backToSignIn)")
  ];

  const lockModalButtons = (isLocked) => {
    modalButtons.forEach(btn => {
      if (isLocked) {
        btn.setAttribute("disabled", "true");
        btn.classList.add("disabled-modal");
      } else {
        btn.removeAttribute("disabled");
        btn.classList.remove("disabled-modal");
      }
    });
  };

  // ✨ Menu View Lockdown
  menuBtn?.addEventListener("click", () => {
    mainContent?.classList.remove("hidden");
    mainContent?.scrollIntoView({ behavior: "smooth" });
    productOrderButtons.forEach(btn => btn.disabled = true);
    signInButtons.forEach(btn => btn.disabled = true);
    lockModalButtons(true);
  });

  // 📦 Order Modal
  orderBtn?.addEventListener("click", () => {
    productOrderButtons.forEach(btn => btn.disabled = false);
    signInButtons.forEach(btn => btn.disabled = false);
    lockModalButtons(false);
    orderModal?.showModal();
    backdrop?.classList.remove("hidden");
  });

  // 👤 Profile Modal
  profileBtn?.addEventListener("click", () => {
    productOrderButtons.forEach(btn => btn.disabled = false);
    signInButtons.forEach(btn => btn.disabled = false);
    lockModalButtons(false);
    profileOverlay?.classList.remove("hidden");
    profileOverlay?.showModal();
    backdrop?.classList.remove("hidden");
  });

  // 🔐 Prevent Switch to SignIn in menu view
  backToSignInBtn?.addEventListener("click", () => {
    mainContent?.classList.add("hidden");
    signInModal?.showModal();
    backdrop?.classList.remove("hidden");
    lockModalButtons(false);
  });

  // 🧼 Close Profile
  closeProfileBtn?.addEventListener("click", () => {
    profileOverlay?.close();
    profileOverlay?.classList.add("hidden");
    backdrop?.classList.add("hidden");
    mainContent?.classList.remove("hidden");
    mainContent?.scrollIntoView({ behavior: "smooth" });
    productOrderButtons.forEach(btn => btn.disabled = true);
    signInButtons.forEach(btn => btn.disabled = true);
    lockModalButtons(true);
  });

  // 🧼 Close Order
  closeOrderModalBtn?.addEventListener("click", () => {
    orderModal?.close();
    backdrop?.classList.add("hidden");
    mainContent?.classList.remove("hidden");
    mainContent?.scrollIntoView({ behavior: "smooth" });
    productOrderButtons.forEach(btn => btn.disabled = true);
    signInButtons.forEach(btn => btn.disabled = true);
    lockModalButtons(true);
  });

  // ⎋ Escape Key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll("dialog[open]")?.forEach(modal => {
        modal.close?.();
        modal.classList.add("hidden");
      });
      backdrop?.classList.add("hidden");
      mainContent?.classList.remove("hidden");
      mainContent?.scrollIntoView({ behavior: "smooth" });
      productOrderButtons.forEach(btn => btn.disabled = true);
      signInButtons.forEach(btn => btn.disabled = true);
      lockModalButtons(true);
    }
  });
});

