document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".bar-fill").forEach((bar) => {
    const value = Number(bar.getAttribute("data-level")) || 0;
    requestAnimationFrame(() => {
      bar.style.width = `${Math.min(100, Math.max(0, value))}%`;
    });
  });
});
