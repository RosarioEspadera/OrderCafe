(() => {
  const searchInput = document.getElementById("searchField");
  const resultsContainer = document.getElementById("searchResults");
  const allProducts = Array.from(document.querySelectorAll(".product-card"));

  // 🧼 Clear previous results
  function clearResults() {
    resultsContainer.innerHTML = "";
  }

  // 🎯 Render filtered products
  function showResults(filtered) {
    clearResults();

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <p class="search-empty">No matching drinks found ☕</p>
      `;
      return;
    }

    filtered.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.classList.add("search-result");
      resultsContainer.appendChild(clone);
    });
  }

  // 🔍 Handle search input
  searchInput?.addEventListener("input", () => {
    const keyword = searchInput.value.trim().toLowerCase();

    if (!keyword) {
      clearResults();
      return;
    }

    const filtered = allProducts.filter(card => {
      const title = card.querySelector(".product-title")?.textContent.toLowerCase();
      return title?.includes(keyword);
    });

    showResults(filtered);
  });
})();

