// Inside app.js
const signInModal = document.getElementById("signInModal");
const openBtn = document.getElementById("signInBtn");
const closeBtn = document.getElementById("closeSignIn");

openBtn.addEventListener("click", () => {
  signInModal.showModal();
  document.body.classList.add("modal-open");
});

closeBtn.addEventListener("click", () => {
  signInModal.close();
  document.body.classList.remove("modal-open");
});

signInModal.addEventListener("click", (e) => {
  const rect = signInModal.getBoundingClientRect();
  const clickedInside = (
    e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom
  );
  if (!clickedInside) {
    signInModal.close();
    document.body.classList.remove("modal-open");
  }
});
