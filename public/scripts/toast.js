export function showToast(message = "Added to cart!", duration = 3000) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("fade-out"), duration - 500);
  setTimeout(() => toast.remove(), duration);
}
