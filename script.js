/* ============================================
   HARSH RAJPUT — PORTFOLIO
   script.js  |  Pure Vanilla JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── 1. CUSTOM CURSOR ─── */
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = (mx - 6) + 'px';
    cursor.style.top  = (my - 6) + 'px';
  });

  (function animateFollower() {
    fx += (mx - fx - 18) * 0.12;
    fy += (my - fy - 18) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animateFollower);
  })();

  // Grow cursor on hover
  document.querySelectorAll('a, button, .skill-card, .project-card, .proj-card, .cert-card, .cert-full-card, .stat-item, input, textarea, .filter-btn, .stack-chip, .all-stack-pill').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform   = 'scale(2.2)';
      follower.style.transform = 'scale(1.5)';
      follower.style.borderColor = '#ff3cac';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform   = 'scale(1)';
      follower.style.transform = 'scale(1)';
      follower.style.borderColor = '#c8f000';
    });
  });


  /* ─── 2. NAV SCROLL SHRINK ─── */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);

      // Highlight active section link (index page only)
      document.querySelectorAll('section[id]').forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 150) {
          document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === '#' + sec.id) a.classList.add('active');
          });
        }
      });
    });
  }


  /* ─── 3. SCROLL REVEAL ─── */
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), (idx % 6) * 90);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => observer.observe(el));


  /* ─── 4. STAT COUNTER ─── */
  const statNums = document.querySelectorAll('.stat-number');

  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el   = entry.target;
      const text = el.textContent.trim();
      const num  = parseInt(text);
      if (isNaN(num)) return;

      const suffix = text.replace(/^\d+/, '');
      let curr = 0;
      const step = num / 45;

      const timer = setInterval(() => {
        curr += step;
        if (curr >= num) { el.textContent = num + suffix; clearInterval(timer); }
        else              { el.textContent = Math.floor(curr) + suffix; }
      }, 30);

      counterObs.unobserve(el);
    });
  }, { threshold: 0.6 });

  statNums.forEach(el => counterObs.observe(el));


  /* ─── 5. CONTACT FORM ─── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn  = form.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled    = true;
      btn.style.opacity = '0.7';

      setTimeout(() => {
        btn.textContent   = '✓ Message Sent!';
        btn.style.background = '#c8f000';
        btn.style.opacity    = '1';
        setTimeout(() => {
          btn.textContent = orig;
          btn.style.background = '';
          btn.disabled = false;
          form.reset();
        }, 3000);
      }, 1200);
    });
  }


  /* ─── 6. HERO TYPING EFFECT ─── */
  const heroSub = document.querySelector('.hero-sub');
  if (heroSub) {
    const full = heroSub.textContent.trim();
    heroSub.textContent = '';
    let i = 0;
    const type = () => {
      if (i < full.length) { heroSub.textContent += full[i++]; setTimeout(type, 16); }
    };
    setTimeout(type, 950);
  }


  /* ─── 7. SKILL CARD 3D TILT ─── */
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -8;
      const ry = ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  8;
      card.style.transform = `perspective(500px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });


  /* ─── 8. SMOOTH ANCHOR SCROLL ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });


  /* ─── 9. PAGE FADE TRANSITION ─── */
  // Fade in
  document.body.style.opacity   = '0';
  document.body.style.transition = 'opacity 0.35s ease';
  requestAnimationFrame(() => requestAnimationFrame(() => { document.body.style.opacity = '1'; }));

  // Fade out on internal page links
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('//') && !href.startsWith('mailto')) {
        e.preventDefault();
        document.body.style.opacity = '0';
        setTimeout(() => { window.location.href = href; }, 320);
      }
    });
  });


  /* ─── 10. CONSOLE EASTER EGG ─── */
  console.log('%c⚡ HARSH RAJPUT', 'color:#c8f000;font-family:monospace;font-size:22px;font-weight:bold;');
  console.log('%c👨‍💻 CSE Student | Aspiring Developer', 'color:#ff3cac;font-size:13px;');
  console.log('%c📧 harshrajput5291@gmail.com', 'color:#00eaff;font-size:13px;');
  console.log('%c🔗 github.com/Harsh-Rajput2006', 'color:#555;font-size:13px;');

});
