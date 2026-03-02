document.addEventListener("DOMContentLoaded", () => {
  const countNode = document.getElementById("projectCount");
  if (!countNode) return;
  const total = document.querySelectorAll(".project-card[data-project='true']").length;
  countNode.textContent = String(total);
});
