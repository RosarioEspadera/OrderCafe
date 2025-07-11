const searchInput = document.getElementById("searchField");
searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.trim().toLowerCase();
  document.querySelectorAll(".product-card").forEach(card => {
   const titleElement = card.querySelector(".product-title");
const title = titleElement ? titleElement.textContent.toLowerCase() : "";
    card.style.display = title.includes(keyword) ? "block" : "none";
 
  const noResultsMsg = document.getElementById("noResults");

let matchFound = false;
document.querySelectorAll(".product-card").forEach(card => {
  const titleElement = card.querySelector(".product-title");
  const title = titleElement ? titleElement.textContent.toLowerCase() : "";
  const isMatch = title.includes(keyword);
  card.style.display = isMatch ? "block" : "none";
  if (isMatch) matchFound = true;
});

noResultsMsg.style.display = matchFound ? "none" : "block";

  });
});
