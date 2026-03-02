document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("resumeYear");
  if (year) year.textContent = String(new Date().getFullYear());
});
