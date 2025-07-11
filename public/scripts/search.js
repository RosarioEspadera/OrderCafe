const searchInput = document.getElementById("searchField");
searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  document.querySelectorAll(".product-card").forEach(card => {
    const title = card.querySelector(".product-title").textContent.toLowerCase();
    card.style.display = title.includes(keyword) ? "block" : "none";
  });
});
