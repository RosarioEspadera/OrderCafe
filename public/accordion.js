document.querySelectorAll(".accordion-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const section = toggle.closest(".accordion-section");
    const content = section.querySelector(".accordion-content");

    // Toggle open/closed
    content.classList.toggle("active");

    // Optional: toggle button state if you want arrow or style change
    toggle.classList.toggle("open");
  });
});
