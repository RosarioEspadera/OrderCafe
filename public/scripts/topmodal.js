document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("menuBtn")?.addEventListener("click", () => {
    document.getElementById("mainContent")?.classList.remove("hidden");
  });

 document.getElementById("orderBtn")?.addEventListener("click", () => {
  const orderModal = document.getElementById("orderModal");
  if (orderModal) {
    orderModal.classList.remove("hidden");   // Make it visible
    orderModal.showModal?.();                // Open dialog
  }
});


  document.getElementById("profileBtn")?.addEventListener("click", () => {
    document.getElementById("profileOverlay")?.classList.remove("hidden");
  });
});

  const menuBtn = document.getElementById("menuBtn");
  const ordersBtn = document.getElementById("ordersBtn");
  const profileBtn = document.getElementById("profileBtn");
  const orderModal = document.getElementById("orderModal");
  const profileOverlay = document.getElementById("profileOverlay");
  const mainContent = document.getElementById("mainContent");

  if (menuBtn && mainContent) {
    menuBtn.addEventListener("click", () => {
      mainContent.classList.remove("hidden");
    });
  }

  if (ordersBtn && orderModal) {
    ordersBtn.addEventListener("click", () => {
      orderModal.showModal?.();
      orderModal.classList.remove("hidden");
    });
  }

  profileBtn.addEventListener("click", () => {
  profileOverlay.classList.remove("hidden");
});

});




