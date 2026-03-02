document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const numbers = document.querySelectorAll("[data-count]");
  if (!numbers.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.getAttribute("data-count")) || 0;
        let count = 0;
        const step = Math.max(1, Math.ceil(target / 24));

        const timer = setInterval(() => {
          count += step;
          if (count >= target) {
            el.textContent = String(target);
            clearInterval(timer);
          } else {
            el.textContent = String(count);
          }
        }, 30);

        observer.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );

  numbers.forEach((el) => observer.observe(el));
});
