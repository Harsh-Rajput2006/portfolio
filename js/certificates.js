document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".cert-card[data-cat]");

  if (!buttons.length || !cards.length) return;

  function setFilter(category) {
    cards.forEach((card) => {
      const itemCategory = card.getAttribute("data-cat");
      card.style.display = category === "all" || itemCategory === category ? "" : "none";
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
      setFilter(button.getAttribute("data-filter") || "all");
    });
  });
});
