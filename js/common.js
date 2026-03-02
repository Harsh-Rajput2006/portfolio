document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const themeLabel = document.getElementById("themeLabel");
  const nav = document.getElementById("siteHeader");
  const page = document.body.dataset.page || "";

  function applyTheme(theme) {
    const isDark = theme === "dark";
    html.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("hr-theme", isDark ? "dark" : "light");
    if (themeIcon) themeIcon.textContent = isDark ? "Moon" : "Sun";
    if (themeLabel) themeLabel.textContent = isDark ? "Dark" : "Light";
    if (themeToggle) themeToggle.setAttribute("aria-pressed", String(isDark));
  }

  applyTheme(localStorage.getItem("hr-theme") || "light");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = html.getAttribute("data-theme") || "light";
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }

  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.getAttribute("data-nav") === page) {
      link.classList.add("active");
    }
  });

  if (nav) {
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 8);
    });
  }

  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  document.querySelectorAll("a[href$='.html']").forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto:")) return;
      event.preventDefault();
      document.body.style.opacity = "0.96";
      setTimeout(() => {
        window.location.href = href;
      }, 80);
    });
  });
});
